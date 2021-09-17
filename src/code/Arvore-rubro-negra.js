// Implemente um árvore rubro-negra contendo as operações de inserir e remover nós.
// Grave um vídeo explicando a sua implementação. No seu vídeo dê destaque as regras para inserção e remoção de nós.
// Demonstre todos os casos possíveis (tanto para inserção quanto para remoção)

//1 caso - A raiz é preta
//2 caso - Se o tio for vermelho , troca as cores do pai, tio e avô
//3 caso - Se o tio for preto, faz uma rotação na direita do pai de Z pra formar uma linha e virar caso 4
//4 caso - Se o tio for preto e formar uma linha entre avô, pai e filho. Faz uma rotação no Z, e o Z vai passar a ser o pai anterior.

const vermelho = 'red'; 
const preto = 'black'; 

class Node{
    constructor(data, esquerda = null, direita = null, cor){
        this.data = data;
        this.esquerda = esquerda;
        this.direita = null;
        this.cor = null;
        
    }
}

class Arvore{
    constructor(raiz = null){    
        this.raiz = null;
    }


    add(data){
        let novoNo = new Node(data);
        
        if (this.raiz === null){
            this.raiz = novoNo;      
            if(this.raiz === novoNo){
                novoNo.cor = preto;     
            }
        } else {
            this.addNode(this.raiz, novoNo);
        }
    }

    
    addNode(no, novoNo){
        if (novoNo.data < no.data){
            if (no.esquerda === null){
                no.esquerda = novoNo;
    
                if(no.esquerda === novoNo){
                    novoNo.cor = vermelho;
                }

        }else {
               this.addNode(no.esquerda, novoNo);
        }
    } else{
        if(no.direita === null){
            no.direita = novoNo;
            novoNo.cor = vermelho;         
        } else{
            this.addNode(no.direita, novoNo);
            }
        }
    }

    remove(data){
        this.raiz = this.noRemove(this.raiz, data);
    }
    noRemove(no, key){
        if (no === null){
            return null;
        }else if (key > no.data){
            no.direita = this.noRemove(no.direita, key);
            return no;
        }else {
            if (no.esquerda === null && no.direita === null){
                no = null;
                return no;
            } 
            if(no.esquerda === null){
                no = no.direita;
                return no;
            }else if (no.direita === null){
                no = no.esquerda;
                return no;
            }
            let aux = this.MenorNo(no.direita);
            no.data = aux.data;
            no.direita = this.noRemove(no.direita, aux.data);
            return no;
        }
    }

    MenorNo(no){
        if (no.esquerda===null){
            return no;
        }else{
            return this.MenorNo(no.esquerda);
        }
    }
    NoRaiz(){
        return this.raiz;
    }
    Buscar(no, data){
        if (no === null){
            return null;
        }
        else if (data < no.data){
            return this.Buscar(no.esquerda, data);
        }else if (data > no.data){
            return this.Buscar(no.direita, data);
        }else{
            return no;
    }
    }
}

let arvore = new Arvore();
arvore.add(5);
arvore.add(6);
arvore.add(4);
arvore.add(7);
arvore.add(8);
arvore.add(9);

let raizz = arvore.NoRaiz();
console.log(raizz);

arvore.remove(5);
console.log('Remoção do 5',arvore);
arvore.remove(6);
console.log('Remoção do 6',arvore);
arvore.remove(7);
console.log('Remoção do 7',arvore);
