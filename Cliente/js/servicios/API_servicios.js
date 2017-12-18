import React from 'react'

class API_servicios {
    constructor() {
        this.url = 'http://localhost:3000'
    }

    registro(usuario) {
        return fetch(this.url + '/registro', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(usuario)
		}).then(res => { return res.json() }).catch(err => { return err })
    }

    login(usuario) {
        return fetch(this.url + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(usuario)
		}).then(res => { return res.json() }).catch(err => { return err })
	}
	
	getEntrenamientos(usuario) {
		return fetch(this.url + '/usuarios/' + usuario + '/entrenamientos', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + localStorage.token,
				'Content-Type': 'application/json'
			}
		}).then(res => { return res.json() }).catch(err => { return err })
	}

	getEntrenamiento(req) {
		return fetch(this.url + '/usuarios/' + req.usuario + '/entrenamientos/' + req.entrenamiento, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + localStorage.token,
				'Content-Type': 'application/json'
			}
		}).then(res => { return res.json() }).catch(err => { return err })
	}
	
	addEntrenamiento(nombre, descripcion, dificultad, usuario) {
		return fetch(this.url + '/usuarios/' + usuario + '/entrenamientos', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + localStorage.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({nombre, descripcion, dificultad})
		}).then(res => { return res.json() }).catch(err => { return err })
	}

	updateEntrenamiento(nombre, descripcion, dificultad, usuario, entrenamiento) {
		return fetch(this.url + '/usuarios/' + usuario + '/entrenamientos/' + entrenamiento, {
			method: 'PUT',
			headers: {
				'Authorization': 'Bearer ' + localStorage.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({nombre, descripcion, dificultad})
		}).then(res => { return res.json() }).catch(err => { return err })
	}

	deleteEntrenamiento(req) {
		return fetch(this.url + '/usuarios/' + req.usuario + '/entrenamientos/' + req.entrenamiento, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + localStorage.token,
				'Content-Type': 'application/json'
			}
		}).then(res => { return res.json() }).catch(err => { return err })
	}
}

export default API_servicios;