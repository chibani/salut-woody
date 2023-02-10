const Greeter = function(config){

    let generated_greetings = '';
    this.config = config;
    
    this.pick_adjective = (word, gender='m') =>
    {
        const adj = this.config.adjectives[Math.floor(Math.random()*this.config.adjectives.length)];
        
        if(typeof adj==='string'){
            return this.gender_swap(adj, gender).replace('%s', word);
        }else{
            return adj[gender].replace('%s', word);
        }
    }

    this.gender_swap = (adj, gender) => {
        if(gender=='f'){
            return adj.replaceAll('_', '');
        }else{
            return adj.replace(/_[^_]+_/, '');
        }
    }

    this.refresh_greetings = function ()
    {
        generated_greetings = config.generate_greetings(this.pick_adjective);        
    }

    this.copy_to_clipboard = () =>{
        navigator.clipboard.writeText(generated_greetings);
    }

    this.get_generated_greetings = () => {
        return generated_greetings;
    }
}

export default Greeter;