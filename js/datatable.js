$(document).ready(function() {
    cargarDatosDelAPI(); // Llama a la función para cargar los datos desde el API

    // Inicializa el DataTable después de cargar los datos
    $('#dataTable').DataTable({
        language: {
            url: "js/datatable-spanish.json" // Reemplaza "ruta/a/lang" con la ubicación real del archivo en tu proyecto
        },
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]]
    });
});




// $(document).ready(function() {
//     $('#dataTable').DataTable({
//         language: {
//             url: "js/datatable-spanish.json" // Reemplaza "ruta/a/lang" con la ubicación real del archivo en tu proyecto
//         },
//         lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]]
//     });
// });