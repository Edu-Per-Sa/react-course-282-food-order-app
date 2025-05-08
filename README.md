Esta aplicacion es una muestra de como se puede realizar una app de pedido de ordenes, se muestra un menu que está almacenado en este caso en un backend propio y que se ejecuta por medio de NodeJS.

En la app se tienen varios menus y se muestran en pantalla, permitiendo al usuario seleccionar algunos de ellos, se muestra tambien un carrito de compra en la parte superior derecha con las cantidades totales de los elementos agregados.

al pulsar sobre este carro se visualiza un backdrop y un modal que muestra el detalle de los elementos agregados.

En el carrito de compra y pulsando el boton de Checkout se va a un formulario donde se solicita completar los campos antes de realizar la orden que es almacenada en un archivo dentro del servidor preparado.

Una vez completado el pedido, se muestra un mensaje al usuario indicando el resultado de la operacion y se limpia tanto el formulario como los elementos agregados en el carrito de compra para que el usuario pueda ovlver a realizar el proceso nuevamente.

*** FRONT-END ***

El front-end fue realizado con react y las siguientes caracteristicas:    
    
    ---> customHooks:
  
  Se realiza un hook personalizado para la gestion de los llamados HTTP (GET y POST)

    ---> useState(initialState)
  
  Nos permite gestionar los estados dentro del customHook.

  CREANDO UN CONTEXTO
    
    export const NameContext = createContext({initialValueContext})
  
  ---> Nos permite crear un contexto por el cual vamos a poder acceder a sus caracteristicas en los componentes donde necesitemos sus funciones y valores de estado.
          initialValueContext: es un bosquejo de lo que se puede acceder, sin funcionalidad alguna pero que sirve para el autocompletado.
  ---> export se utiliza para poder tener acceso en los componentes donde hayamos envuelto con el provider.

  CREANDO UNA FUNCION/COMPONENTE PROVIDER

    export default function NameContextProvider({children}) { logica de programa... const nameContext = { contiene los estados y funciones que se podran acceder } return (<NameContext.Provider value={nameContext}> {children} </NameContext.Provider>)}
      
  Creando una funcion componente dentro del mismo archivo donde creamos el contexto se tiene que retornar un

  ---> Permite crear un componente que se utiliza para suministrar acceso al contexto dentro de la aplicacion.
  
  PROVEER UN COTEXTO
    
  Dentro de la app, tenemos que indicar a que componenetes y subcomponentes queremos que el sistema tenga acceso.
  
  Esto se hace importando el NameContextProvider que habiamos creado previamente y envolviendo los componentes dentro del el.
    
    <NameContextProvider>
      << componentes que se quiere dar acceso>>
    </NameContextProvider>
    
      
  USO DE CONTEXTO
  
    ---> const cartContext = useContext(nameContext)
  
  Nos permite gestionar los estados del carrito de compra. Asi como las funciones de agregar y eliminar items del carrito.

    ---> const modalContext = useContext()
  
  Nos permite registrar y manejar los estados y lo diferentes contenidos que se muestran en los modales. Carrito de compra, form de datos de usuario, respuesta de orden exitosa, etc... Asi como las funciones de mostrar y ocultar el modal.

Se generan varios elemento/componentes de interfaz de usuario para ser reutilizados como lo son Button, Modal e Input. Estos componentes nos permiten generalizar y personalizar la interfaz.

    ---> useEffect(() => {}, [dependencias])
  
Nos permite ejecutar parte de codigo una vez se haya renderizado el componente, y se realizan posteriores evaluaciones si se agregan algunas dependencias y estas cambian su valor.

    
*** BACK-END ***
  El back se realiza utilizando NodeJS y la libreria express para gestionar los nodos (End Points) de la API.
