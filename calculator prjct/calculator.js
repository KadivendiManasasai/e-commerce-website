var op = document.getElementById("showop")

function display(input){
    op.value= op.value + input
}

function clearall(){
    op.value = ""
}

function del(){
    op.value = op.value.slice(0,-1)
}

function equal(){
    try{
    op.value = eval(op.value)
    }
    catch(error){
        op.value = "Error"
    }
}