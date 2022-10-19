//Mediante la clase Entry se declaran las parametros del constructor que queremos controlar en esta clase
class Entry{
    constructor(owner,number,nit,car,model,color,year,licensePlate,entryDate,exitDate){
        this.owner = owner; // Usuario
        this.number = number; // DUI
        this.nit = nit; // NIT
        this.car = car; // Marca del carro
        this.model = model; // Modelo
        this.color = color; // Color del carro
        this.year = year; // Año del carro
        this.licensePlate = licensePlate; // Placa
        this.entryDate = entryDate; // Fecha de ingreso al taller
        this.exitDate = exitDate; // Fecha de salida del taller
    }
}
// Esta clase sera la encargada de mantener las tareas o procesos que el usuario haga en la interfaz de el, (formulario)
class UI{
    static displayEntries(){
   
        const entries = Store.getEntries();
        entries.forEach((entry) => UI.addEntryToTable(entry));
    }
    // Tabla que contiene las variables que almacenan los campos del formulario
    static addEntryToTable(entry){
        const tableBody=document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.owner}</td>
                            <td>${entry.number}</td>
                            <td>${entry.nit}</td>
                            <td>${entry.car}</td>
                            <td>${entry.model}</td>
                            <td>${entry.color}</td>
                            <td>${entry.year}</td>
                            <td>${entry.licensePlate}</td>
                            <td>${entry.entryDate}</td>
                            <td>${entry.exitDate}</td>
                            <td><button class="btn btn-info delete">X</button></td>
                        `;
        tableBody.appendChild(row);
    }
    static clearInput(){
        //Selecciona todas las entradas del formulario
        const inputs = document.querySelectorAll('.form-control');
        //Borra el contenido de cada entrada que conpone el formulario
        inputs.forEach((input)=>input.value="");
    }
    static deleteEntry(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div,form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    // Validacion de los campos del formulario 
    static validateInputs(){
        const owner = document.querySelector('#owner').value;
        const number = document.querySelector('#number').value;
        const nit = document.querySelector('#nit').value;
        const car = document.querySelector('#car').value;
        const model = document.querySelector('#model').value;
        const color = document.querySelector('#color').value;
        const year = document.querySelector('#year').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        const entryDate = document.querySelector('#entryDate').value;  
        const exitDate = document.querySelector('#exitDate').value;     
        var licensePlateRegex = /^(?:[A-Z]{2}-\d{2}-\d{2})|(?:\d{2}-[A-Z]{2}-\d{2})|(?:\d{2}-\d{2}-[A-Z]{2})$/;
        //Condicional para indicarnos que todos los campos deben de estar completos para poder enviar el registro del carro
        if(owner === '' | car === '' | licensePlate === '' || entryDate === '' || exitDate === ''){
            UI.showAlert('Todos los campos deben ser completados!','danger');
            return false;
        }
        // Condicional para validacion a la hora de configurar la fecha 
        if(exitDate < entryDate){
            UI.showAlert('La fecha de salida no puede ser inferior a la fecha de entrada','danger');
            return false;
        }
        return true;
    }
}
// La clase store es la que manejara Local Storage
class Store{
    static getEntries(){
        // Leer y guardar las entradas del formulario
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(licensePlate){
        const entries = Store.getEntries();
        entries.forEach((entry,index) => {
            if(entry.licensePlate === licensePlate){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}
// A partir de aca es donde se visualizaran los eventos
document.addEventListener('DOMContentLoaded',UI.displayEntries);
// Agregamos los eventos
document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declaramos las variables tipo const ya que solo son variables de lectura
        const owner = document.querySelector('#owner').value;
        const number = document.querySelector('#number').value;
        const nit = document.querySelector('#nit').value;
        const car = document.querySelector('#car').value;
        const model = document.querySelector('#model').value;
        const color = document.querySelector('#color').value;
        const year = document.querySelector('#year').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        const entryDate = document.querySelector('#entryDate').value;
        const exitDate = document.querySelector('#exitDate').value;
        if(!UI.validateInputs()){
            return;
        }
        //Se instancian las entradas del formulario
        const entry = new Entry(owner,number,nit, car,model, color, year, licensePlate, entryDate, exitDate);
        //Se agregan las entradas que contiene la tabla de la clase UI
        UI.addEntryToTable(entry);
        Store.addEntries(entry);
        //Se elimina todo el contenido que haya en las entradas
        UI.clearInput();
        // Alert indicando que el carro ha sido registrado
        UI.showAlert('Carro registrado con exito !!','success');

    });
//Evento Eliminar
    document.querySelector('#tableBody').addEventListener('click',(e)=>{
        //Aqui procedemos a invocar la funcion de la clase UI para eliminar las entradas de la tabla de registro
        UI.deleteEntry(e.target);
        //Al campo de la placa se identifica y destaca como elemento unico para una sola entrada
        var licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        //Invocamos a la función Store para eliminar la entrada del almacenamiento local
        Store.removeEntries(licensePlate);
        //Alerta de que se ha eliminado el registro del carro
        UI.showAlert('Coche eliminado con éxito ','success');
    })
