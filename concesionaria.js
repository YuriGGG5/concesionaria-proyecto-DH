/* Ejercicio de concesionaria Digital House */

const autos    = require( './autos' );
const personas = require( './personas' );

const concesionaria = {

   
    autos: autos,
    personas: personas,

   buscarAuto: function ( patente ) {
      
      let retorno = null;

      for( let auto of this.autos ) {

         if( auto.patente === patente )
            retorno = auto;

      }  

      return retorno;

   },

   venderAuto: function( patente ) {

      let auto = this.buscarAuto( patente );

      auto.vendido = true;

   },

   autosParaLaVenta: function() {

      this.autos = this.autos.filter( function( auto ){

         if( !auto.vendido )
            return auto;

      });

      return this.autos;

   },

   autosNuevos: function() {

      this.autos = this.autosParaLaVenta();
      this.autos = this.autos.filter( function( auto ){

         if( auto.km < 100 )
            return auto;

      });

      return this.autos;

   },

   listaDeVentas: function() {

      let listaVentas = [];

      this.autos.forEach( function( auto ){

         if( auto.vendido == true )
            listaVentas.push( auto.precio );

      });

      return listaVentas;

   },

   totalDeVentas: function() {

      let sumatoria = 0;
      let ventas    = this.listaDeVentas();

      if( ventas.length == 0 )
         return sumatoria;
      else{

         sumatoria = ventas.reduce( function( a, b ) {
            return a + b;
         });
         
         return sumatoria;

      }
   },

   puedeComprar: function( auto, persona ) {

      if( 
         persona.capacidadDePagoEnCuotas * auto.cuotas >= auto.precio && persona.capacidadDePagoTotal >= auto.precio
      )
         return true
      else 
         return false;

   },

   autosQuePuedeComprar: function( persona ) {

      let estatico    = this;
      let autosVenta  = this.autosParaLaVenta();

      let autosCompra = autosVenta.filter( function( auto ) {

         if( estatico.puedeComprar( auto, persona ) == true )
            return auto;

      });

      return autosCompra;

   }

};

module.exports = concesionaria;