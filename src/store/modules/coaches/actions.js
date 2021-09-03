export default {
    // 這裡專門把data送入serve的
    async registerCoach(context,data){
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas,
        }

        // 前面輸入 database網址 後面再給他檔案名稱跟類型
        // userid 作為json的檔案名稱 該檔案名稱內會有存相關的內容
        const response = await fetch(`https://udemy-vue-coach-database-default-rtdb.firebaseio.com/coaches/${userId}.json`,{
            method: 'PUT',
            // put 是將內容新增或是更新上去
            body: JSON.stringify(coachData)
        })

        const responseData = await response.json();

        // 成功會有ok的屬性, 如果沒有就代表沒有傳到server 必須解決
        if(!responseData.ok){
            console.log(responseData)
        }

        context.commit('registerCoach',{
            ...coachData,
            id:userId
        })
    },

    async loadCoaches(context,payload){

        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return;
        }

        const response = await fetch(`https://udemy-vue-coach-database-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json()

        if(!response.ok){
            const error = new Error(responseData.message || '連線失敗!');
            throw error;
        }

        const coaches = [];

        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            }
            coaches.push(coach)
        }

        context.commit('setCoaches',coaches);
        context.commit('setFetchTimestamp');
    }
}
