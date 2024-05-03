//cargar los datos desde la api
async function cargarDatosDelAPI() {
    try {
        const response = await fetch('http://localhost:8081/cruddsi3/api/v1/producto');
        const datos = await response.json();
        const tablaBody = document.getElementById('rowsProductos');

        let rows = '';
        datos.forEach(dato => {
            rows += `
                <tr>
                    <td>${dato.id}</td>
                    <td>${dato.descripcion}</td>
                    <td>${dato.unid_medida}</td>
                    <td>${dato.costo.toFixed(2)}</td>
                    <td>${dato.precio.toFixed(2)}</td>
                    <td>${dato.stock.toFixed(3)}</td>
                    <td>
                        <button class='btn btn-success ms-2' onclick='buscarParaEditar(${dato.id})' data-bs-toggle='modal' data-bs-target='#modalFormulario'>Editar</button>
                        <button class='btn btn-danger' onclick='eliminarDato(${dato.id})'>Eliminar</button>
                    </td>
                </tr>
            `;
        });
        tablaBody.innerHTML = rows;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}



async function buscarParaEditar(id) {
  try {
    const response = await fetch(
      "http://localhost:8081/cruddsi3/api/v1/producto/" + id
    );
    const dato = await response.json();
    document.getElementById("txtId").value = dato.id;
    document.getElementById("txtDescripcion").value = dato.descripcion;
    document.getElementById("txtUnidMed").value = dato.unid_medida;
    document.getElementById("txtCosto").value = dato.costo.toFixed(2);
    document.getElementById("txtPrecio").value = dato.precio.toFixed(2);
    document.getElementById("txtStock").value = dato.stock.toFixed(3);
  } catch (error) {}
}

async function enviarDatosApi() {
  try {
    const id = document.getElementById("txtId").value;
    const descripcion = document.getElementById("txtDescripcion").value;
    const unidMed = document.getElementById("txtUnidMed").value;
    const costo = document.getElementById("txtCosto").value;
    const precio = document.getElementById("txtPrecio").value;
    const stock = document.getElementById("txtStock").value;

    const data = {
      descripcion: descripcion,
      unid_medida: unidMed,
      costo: costo,
      precio: precio,
      stock: stock,
    };

    if (!isNaN(id)) {
      Object.assign(data, { id: id });
    }

    const response = await fetch(
      "http://localhost:8081/cruddsi3/api/v1/producto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      cargarDatosDelAPI();
      document.getElementById("frmProducto").reset();

      // Agregar SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Datos enviados",
        text: "Los datos se han enviado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.error("Error al enviar los datos a la API:", response.statusText);
    }
  } catch (error) {
    console.error("Error al enviar los datos a la API:", error);
  }
}

async function eliminarDato(id) {
  try {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      const response = await fetch(
        `http://localhost:8081/cruddsi3/api/v1/producto/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        cargarDatosDelAPI(); // Recargar los datos después de la eliminación
        Swal.fire(
          "Eliminado",
          "El dato ha sido eliminado correctamente",
          "success"
        );
      } else {
        console.error("Error al eliminar el dato:", response.statusText);
        Swal.fire(
          "Error",
          "Hubo un error al intentar eliminar el dato",
          "error"
        );
      }
    }
  } catch (error) {
    console.error("Error al eliminar el dato:", error);
    Swal.fire("Error", "Hubo un error al intentar eliminar el dato", "error");
  }
}

function formReset() {
  document.getElementById("frmProducto").reset();
}



// window.onload = function() {
//   cargarDatosDelAPI()
// }