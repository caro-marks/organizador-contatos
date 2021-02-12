const googleAuth = (function () {
    const apiUrl = 'https://apis.google.com/js/api.js'
    function installClient() {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = apiUrl
            script.onreadystatechange = script.onload = function () {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    setTimeout(function () {
                        resolve()
                    }, 500)
                }
            }
            document.getElementsByTagName('head')[0].appendChild(script)
        })
    }

    function initClient(config) {
        return new Promise((resolve) => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init(config)
                    .then(() => {
                        resolve(window.gapi)
                    })
            })
        })
    }

    class Auth {
        constructor() {
            if (!(this instanceof Auth)) return new Auth()
            this.GoogleAuth = null
            this.isAuthorized = false
            this.isInit = false
            this.prompt = null
            this.isLoaded = function () {
                console.warn('isLoaded() will be deprecated. You can use "this.$gAuth.isInit"')
                return !!this.GoogleAuth
            }

            this.load = (config, prompt) => {
                installClient()
                    .then(() => {
                        return initClient(config)
                    })
                    .then((gapi) => {
                        this.GoogleAuth = gapi.auth2.getAuthInstance()
                        this.isAuthorized = this.GoogleAuth.isSignedIn.get()
                        this.isInit = true
                        this.prompt = prompt
                    })
            }

            this.signIn = (successCallback, errorCallback) => {
                return new Promise((resolve, reject) => {
                    if (!this.GoogleAuth) {
                        if (typeof errorCallback === 'function')
                            errorCallback(false)
                        reject(false)
                        return
                    }
                    this.GoogleAuth.signIn()
                        .then(googleUser => {
                            if (typeof successCallback === 'function')
                                successCallback(googleUser)
                            this.isAuthorized = this.GoogleAuth.isSignedIn.get()
                            resolve(googleUser)
                        })
                        .catch(error => {
                            if (typeof errorCallback === 'function')
                                errorCallback(error)
                            reject(error)
                        })
                })
            }

            this.listEmails = () => {
                window.gapi.client.people.otherContacts.list({
                    "readMask": "emailAddresses"
                })
                .then((response) => response.result.otherContacts)
                .then(res => res.json(),
                (err) => { console.error("Execute error", err) });
            }

            this.signOut = (successCallback, errorCallback) => {
                return new Promise((resolve, reject) => {
                    if (!this.GoogleAuth) {
                        if (typeof errorCallback === 'function')
                            errorCallback(false)
                        reject(false)
                        return
                    }
                    this.GoogleAuth.signOut()
                        .then(() => {
                            if (typeof successCallback === 'function')
                                successCallback()
                            this.isAuthorized = false
                            resolve(true)
                        })
                        .catch(error => {
                            if (typeof errorCallback === 'function')
                                errorCallback(error)
                            reject(error)
                        })
                })
            }
        }
    }

    return new Auth()
})()

function installGoogleAuthPlugin(Vue, options) {
    let GoogleAuthConfig = null
    let prompt = 'consent'
    let GoogleAuthDefaultConfig = {
        scope: 'https://www.googleapis.com/auth/contacts.readonly',
        discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1']
    }
    
    if (typeof options === 'object') {
        GoogleAuthConfig = Object.assign(GoogleAuthDefaultConfig, options)
        if (options.scope) GoogleAuthConfig.scope = options.scope
        if (options.prompt) prompt = options.prompt
        if (!options.clientId) {
            console.warn('clientId is required')
        }
    } else {
        console.warn('Invalid option type. Object type accepted only')
    }

    Vue.gAuth = googleAuth;
    Object.defineProperties(Vue.prototype, {
        $gAuth: {
            get: function () {
                return Vue.gAuth
            }
        }
    })

    Vue.gAuth.load(GoogleAuthConfig, prompt)
}

export default installGoogleAuthPlugin