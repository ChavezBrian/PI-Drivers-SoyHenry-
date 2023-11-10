// Define una función de validación llamada validation que toma un objeto como argumento
function validation({name, lastname, nationality, image, description, birthdate}) {
    // Expresiones regulares para validar patrones de texto y URL
    const onlyLetters = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/;
    const url = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const imageurl = /\.(jpg|jpeg|png|gif)$/i;

    // Objeto para almacenar errores
    const errors = {};

    // Verificaciones y validaciones para cada campo
    if (name.length < 3) errors.name = "Must be at least 3 characters";
    if (!name.length) errors.name = "Complete the field";
    if (lastname.length < 3) errors.lastname = "Must be at least 3 characters";
    if (!lastname.length) errors.lastname = "Complete the field";
    if (description.length < 5) errors.description = "Must be at least 5 characters";
    if (!description.length) errors.description = "Complete the field";
    if (!birthdate.length) errors.birthdate = "Complete the field";
    if (nationality.length < 5) errors.nationality = "Must be at least 5 characters";
    if (!nationality.length) errors.nationality = "Complete the field";

    if (!onlyLetters.test(name)) errors.name = "The field 'name' only accepts letters";
    if (!onlyLetters.test(lastname)) errors.lastname = "The field 'lastname' only accepts letters";
    if (!onlyLetters.test(nationality)) errors.nationality = "The field 'nationality' only accepts letters";

    if (!url.test(image) || !imageurl.test(image)) errors.image = "Must provide an image";

    // Retorna el objeto de errores
    return errors;
}

// Exporta la función de validación como predeterminada
export default validation;
