# Piste : réécriture Rust/WebAssembly

## Objectif
Porter la logique de génération de salutations (`greeter.js`) en Rust compilé en Wasm,
tout en conservant le JS pour le DOM et GSAP.

## Pourquoi c'est un bon projet d'apprentissage
- La classe `Greeter` est de la pure logique, sans DOM → candidat idéal pour Wasm
- Taille de projet idéale : assez petit pour ne pas se perdre, assez concret
- Concepts couverts : wasm-bindgen, frontière JS/Wasm, serde, types Rust

## Outils
- `wasm-pack` + `wasm-bindgen` (standard de l'écosystème)
- `serde` / `serde_json` pour désérialiser les adjectifs JSON
- Webpack `experiments.asyncWebAssembly` pour intégrer le module

## Ressources
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)

---

## Structure de projet proposée

```
salut-woody/
├── woody-greeter/              ← crate Rust
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs              ← exports #[wasm_bindgen]
│       ├── greeter.rs          ← struct Greeter + logique
│       ├── adjective.rs        ← enum Adjective + parsing JSON
│       ├── profile.rs          ← structs Profile, Template, Slot, Condition
│       └── registry.rs         ← fusion de plusieurs dictionnaires
│
├── data/
│   ├── dictionaries/
│   │   ├── common.json
│   │   ├── woodworking.json
│   │   └── ...
│   └── profiles/
│       ├── woody.json
│       └── ...
│
├── src/
│   ├── index.js                ← inchangé (DOM + GSAP)
│   └── assets/
│
└── pkg/                        ← généré par wasm-pack (gitignore)
```

---

## Modèle de données

### `data/dictionaries/woodworking.json`
```json
{
  "id": "woodworking",
  "label": "Lutherie & travail du bois",
  "adjectives": [
    "poncé_e_s %s",
    "verni_e_s %s",
    { "m": "%s vernis", "f": "%s vernies" }
  ]
}
```

### `data/profiles/woody.json`
```json
{
  "id": "woody",
  "name": "Woody Lutherie",
  "dictionaries": ["common", "woodworking"],
  "templates": [
    {
      "condition": null,
      "pattern": "Salut les {0}, les {1} et les {2}",
      "slots": [
        { "word": "copeaux", "gender": "m" },
        { "word": "échardes", "gender": "f" },
        { "word": "sciures",  "gender": "f" }
      ]
    },
    {
      "condition": { "type": "date", "month": 4, "day": 1 },
      "pattern": "Salut les {0}, les {1} et les {2}",
      "slots": [
        { "word": "algues",    "gender": "f" },
        { "word": "anguilles", "gender": "f" },
        { "word": "poissons",  "gender": "m" }
      ]
    }
  ]
}
```

---

## Types Rust clés

```rust
// adjective.rs
#[derive(Deserialize)]
#[serde(untagged)]
pub enum Adjective {
    Simple(String),
    Gendered { m: String, f: String },
}

// profile.rs
#[derive(Deserialize)]
pub struct Profile {
    pub id: String,
    pub dictionaries: Vec<String>,
    pub templates: Vec<Template>,
}

#[derive(Deserialize)]
pub struct Template {
    pub condition: Option<Condition>,
    pub pattern: String,
    pub slots: Vec<Slot>,
}

#[derive(Deserialize)]
pub struct Slot {
    pub word: String,
    pub gender: String,
}

#[derive(Deserialize)]
#[serde(tag = "type")]
pub enum Condition {
    #[serde(rename = "date")]
    Date { month: u32, day: u32 },
}

// registry.rs
pub struct Registry {
    adjectives: Vec<Adjective>,  // fusion de tous les dicts chargés
}
```

## Surface Wasm exposée à JS

```rust
#[wasm_bindgen]
pub struct WoodyGreeter { /* profile + registry */ }

#[wasm_bindgen]
impl WoodyGreeter {
    #[wasm_bindgen(constructor)]
    pub fn new(profile_json: &str, dictionaries_json: &str) -> WoodyGreeter { ... }

    pub fn generate(&self) -> String { ... }
    pub fn adjectives_count(&self) -> usize { ... }
}
```

## Utilisation côté JS

```js
const profileId = new URLSearchParams(location.search).get('profile') ?? 'woody';

const profile = await fetch(`data/profiles/${profileId}.json`).then(r => r.json());
const dicts   = await Promise.all(
    profile.dictionaries.map(id => fetch(`data/dictionaries/${id}.json`).then(r => r.json()))
);

await init();
const greeter = new WoodyGreeter(JSON.stringify(profile), JSON.stringify(dicts));
```

---

## Bénéfices de l'architecture multi-profils / multi-dicts

| Besoin | Solution |
|---|---|
| Adjectifs communs | `common.json` inclus dans tous les profils |
| Univers spécifique | `woodworking.json`, `gaming.json`, etc. |
| Nouveau streamer | Créer `profiles/alice.json` + combiner les dicts voulus |
| Template personnalisé | Définir ses propres `slots` dans le profil |
| Dates spéciales | `condition` dans le template, évaluée par Rust |
| Pas de rebuild | JSON chargés dynamiquement par fetch |
