var fileform=document.querySelector("#fileform")
var folderform=document.querySelector("#folderform")
function donoof(){
    document.querySelectorAll('form').forEach(function(form){
        form.style.display="none"
    })
}
document.querySelector("#fileicon").addEventListener("click",function(){
    donoof()
    fileform.style.display="initial"
})
document.querySelector("#foldericon").addEventListener("click",function(){
    donoof()
    folderform.style.display="initial"
})

document.querySelector("#btn").addEventListener("click",function(){
    document.querySelector("#textform").submit();
})
document.querySelector("#files").addEventListener("click",function(dets){
    if(dets.target.id==="renameicon"){
        document.querySelector("#overlay").style.display="initial"
        document.querySelector("#overlay #rename").value=dets.target.dataset.filename
        document.querySelector("#renameform").setAttribute("action",`/rename/${dets.target.dataset.filename}`)
    }
})
// window.addEventListener("keydown", function (dets) {
//     console.log(dets.key)
//   });
