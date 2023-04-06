class Prototype {
    constructor() {
        
    }

    deepCopy(row){
        var copy = [];
        row.forEach(elem => {
            if (Array.isArray(elem)){
                copy.push(deepCopy(elem));
            }
            else {
                copy.push(elem);
            }  
        })
        return copy;
    }

    deepCopyObject(board){
        var copy = [];
        for(let [key, value] of Object.entries(board)){
            copy[key] = this.deepCopy(value);
        }
        return copy;
    }
}

module.exports = Prototype;