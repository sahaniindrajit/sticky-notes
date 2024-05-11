var container2=document.getElementsByClassName("container2")[0];
var container3=document.getElementsByClassName("container3")[0];
var container=document.getElementsByClassName(".success");
var checkIcon=document.getElementById("check-icon");
var xIcon=document.getElementById("x-icon");
var i=0;

xIcon.addEventListener("click",function(){
    typeNote();
})

checkIcon.addEventListener("click",function(){
    addNotes();
})

getNotes().forEach((note) => {
    const noteElement = createNote(note.id, note.content);

    container2.insertBefore(noteElement, container2.firstChild);
});

function typeNote(){
    if(container3.style.display=="none"){
        container3.style.display="block";
    }
    else{
        container3.style.display="none";
    }
}



function margin(){
    var random_margin=["10px","13px","15px","12px","13px","16px","17px"];
    return random_margin[Math.floor(Math.random()*random_margin.length)];

}



function color(){
    var random_color=["#219866","#51c30f","#70a85f","#85cadb","#2390b5","#46fb58","#58759f","#e72e20"];
    if(i>random_color.length-1){
        i=0;
    }
    return random_color[i++];
}

function getNotes(){
    return JSON.parse(localStorage.getItem("notes-history") || "[]" );
}


function saveNotes(notes){
    localStorage.setItem("notes-history",JSON.stringify(notes));
}

function createNote(id,content){
    var node1=document.createElement("textarea");

    node1.value=content;
    node1.setAttribute("style","width:200px ; height:200px ; font-size:26px ; padding:25px; margin-top:10px; overflow:hidden; box-shadow:0px 10px 24px 0px rgba(0,0,0,0.75)");
    node1.style.margin=margin();
    
    node1.style.background=color();


    node1.addEventListener("change",()=>{
        updateNote(id,node1.value);
    })

    node1.addEventListener("mouseenter",function(){
        node1.style.transform="scale(1.1)";
    })

    node1.addEventListener("mouseleave",function(){
        node1.style.transform="scale(1)";
    
    })

    node1.addEventListener("dblclick",function(){
        deleteNote(id,node1);
    })

    

    container2.insertBefore(node1, container2.firstChild);
    document.getElementById("note-text").value='';

    return node1;

}


function addNotes(){
    const existingNotes=getNotes();
    const noteObject={
        id:Math.floor(Math.random()*100000),
        content:document.getElementById("note-text").value
    };

    createNote(noteObject.id,noteObject.content);

    
    existingNotes.push(noteObject);
    saveNotes(existingNotes);
}

function updateNote(id,newContent){
    const notes=getNotes();
    const targetNote=notes.filter((note)=>note.id===id)[0];

    targetNote.content=newContent;
    saveNotes(notes);
}

function deleteNote(id,element){
    const notes=getNotes().filter(note=>note.id !=id);

    saveNotes(notes);
    container2.removeChild(element);
}