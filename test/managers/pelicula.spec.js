require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { getPelicula,Peliculas,getOnePelicula,PostPelicula} = require('../../managers/Pelicula')
const body_parser = require('body-parser');

describe('User Manager', () => {
    
    it('Obtener todas las Peliculas', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = sandbox.stub()
      const nextMock = sandbox.stub()
      const res = {
        status: statusMock,
        json: jsonMock
      }
      getPelicula(reqMock, res, nextMock)
      sinon.assert.calledWith(statusMock, 200)
      sinon.assert.calledWith(jsonMock, Peliculas)
    })
})
it('will get one user sucessfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
      params: {
        pelicula:  'Avengers End Game'
      }
    }
    const nextMock = sandbox.stub()
    const response = {
        NombrePelicula: "Avengers End Game",
        NombreDirector: "Keanu",
        Genero: "Accion",
        Duracion: 60,
        Descripcion: "La mejor pelicula del mundo"
    }
    const resMock = {
      status: statusMock,
      json: jsonMock
    }

    getOnePelicula(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, response)
  })

  it('Pelicula que no existe', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
      params: {
        pelicula: 'Esto no existe'
      }
    }
    const nextMock = sandbox.stub()
    const resMock = {
      status: statusMock,
      send: sendMock
    }
    getOnePelicula(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.called(sendMock)
  })

  it('Agregar Pelicula sin error', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    
    const reqMock = {
      body: {
        NombrePelicula: "Avengers End Game2",
        NombreDirector: "Prueba",
        Genero: "Accion",
        Duracion: 60,
        Descripcion: "La mejor pelicula del mundo2"
      }
    }
    const nextMock = sandbox.stub()
    const response = Peliculas
    const resMock = {
      status: statusMock,
      json: jsonMock
    }

    PostPelicula(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 201)
    sinon.assert.calledWith(jsonMock, response)
  })

  it('Agregar Pelicula con error cuando no estan todos los parametros', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
      body: {
        NombrePelicula: "Avengers End Game2",
        NombreDirector: "Prueba",
        Genero: "Accion",
        Duracion: 60,
        
      }
    }
    const nextMock = sandbox.stub();
    const resMock = {
        status: statusMock,
        send: sendMock
    }

    PostPelicula(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.called(sendMock)
  })
  it('No agregar pelicula por que no existe el parametro Pelicula o esta mal escrito', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
      body: {
        NombrePeliculas: "Avengers End Game",
        NombreDirector: "Keanu",
        Genero: "Accion",
        Duracion: 60,
        Descripcion: "La mejor pelicula del mundo"
      }
    }
    const nextMock = sandbox.stub();
    const resMock = {
        status: statusMock,
        send: sendMock
    }

    PostPelicula(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.called(sendMock)
  })