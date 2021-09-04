export default {
    async login(context,payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOLnjBBBcY6fvc1vMvuF0nl9HZD2jNbcs',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        });

        const responseData = await response.json()

        if(!response.ok){
            console.log(responseData)
            const error = new Error(responseData.message || '授權失敗');
            throw error;
        }

        console.log(responseData)
        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
        })
    },
    
    async signup(context,payload){
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOLnjBBBcY6fvc1vMvuF0nl9HZD2jNbcs',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        });

        const responseData = await response.json()

        if(!response.ok){
            console.log(responseData)
            const error = new Error(responseData.message || '授權失敗');
            throw error;
        }

        console.log(responseData)
        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
        })
    }
}
