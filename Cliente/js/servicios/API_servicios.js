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
		}).then(response => { return response.json() }).catch(err => { return err })
    }

    login(usuario) {
        return fetch(this.url + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(usuario)
		}).then(response => { return response.json() }).catch(err => { return err })
	}
	
	getEntrenamientos(usuario) {
		return fetch(this.url + '/usuarios/' + usuario + '/entrenamientos', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + localStorage.token,
				'Content-Type': 'application/json'
			}
		}).then(response => { return response.json() }).catch(err => { return err })
	}
}

export default API_servicios;