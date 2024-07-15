const fileInput = document.getElementById("fileInput")
fileInput.addEventListener("change",function(event){
    console.log(event.target.files[0])
    const files =event.target.files[0]
   

    const reader = new FileReader()

    reader.onload = function(event){
        const data =event.target.result
        const workbook =XLSX.read(data,{type:"binary"})
        const sheetName =workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        console.log(worksheet)
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:"A"})
        console.log(emailList)

    }

    reader.readAsArrayBuffer(files)
})
