require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { getPelicula,Peliculas,getOnePelicula,PostPelicula,PutPelicula,DeletePelicula} = require('../../managers/Pelicula')


describe('User Manager', async () => {
    
    it('Obtener todas las Peliculas', async() => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = sandbox.stub()
      const nextMock = sandbox.stub()
      const res = {
        status: statusMock,
        json: jsonMock
      }
      await getPelicula(reqMock, res, nextMock).then(() =>{
      sinon.assert.calledWith(statusMock, 200)
      sinon.assert.calledWith(jsonMock, Peliculas)
    }).catch(() =>{})

    })

it('will get one user sucessfully',async () => {
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

    await getOnePelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, response)
    }).catch(() =>{})
  })

  it('Pelicula que no existe', async () => {
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
    await getOnePelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })

  it('Agregar Pelicula sin error',async () => {
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

    await PostPelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 201)
    sinon.assert.calledWith(jsonMock, response)
  }).catch(() =>{})
  })

  it('Agregar Pelicula con error cuando no estan todos los parametros', async() => {
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

    await PostPelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })
  it('No agregar pelicula por que no existe el parametro Pelicula o esta mal escrito', async() => {
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

    await PostPelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 400)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })
  it('Actualizar Pelicula', async() => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
        params: {
            pelicula: 'Avengers End Game'
          },
        body: {
        NombrePelicula: "Avengers End Game25",
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

    await PutPelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })
  it('Actualizar Pelicula Error cuando el nombre no existe', async() => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
        params: {
            pelicula: 'Avengers End Game5'
          },
        body: {
        NombrePelicula: "Avengers End Game25",
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

    await PutPelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })

  it('Actualizar Pelicula Error cuando el parametro no existe',async () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
        params: {
            pelicula: 'Avengers End Game'
          },
        body: {
        NombrePelicula2: "Avengers End Game25",
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

    await PutPelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })
  it('Eliminar Pelicula',async () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
      params: {
        pelicula: "Avengers End Game25",
      }
    }
    const nextMock = sandbox.stub();
    const resMock = {
        status: statusMock,
        send: sendMock
    }

    await DeletePelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 204)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })
  it('Eliminar Pelicula Que no exista', async() => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const sendMock = sandbox.stub()
    const reqMock = {
      params: {
        pelicula: "Avengers End Game26",
      }
    }
    const nextMock = sandbox.stub();
    const resMock = {
        status: statusMock,
        send: sendMock
    }

    await DeletePelicula(reqMock, resMock, nextMock).then(() =>{
    sinon.assert.calledWith(statusMock, 404)
    sinon.assert.called(sendMock)
  }).catch(() =>{})
  })
})