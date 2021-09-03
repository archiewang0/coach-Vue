<template>
    <base-dialog :show="!!error" title="發生了錯誤喔!" @close="handleError">
        <p>{{error}}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
    
                <base-button v-if="!isCoach  && !isloading" link to="/register">Register as Coach</base-button>
            </div>
            <div v-if="isloading">
                <base-spinner></base-spinner>
            </div>
            <ul v-if="hasCoaches">
                <!-- <li v-for="coach in  filteredCoaches" :key="coach.id">
                    {{coach.firstName}}
                </li> -->
                <coach-item 
                    v-for="coach in filteredCoaches" 
                    :key="coach.id" 
                    :id="coach.id" 
                    :first-name="coach.firstName"
                    :last-name="coach.lastName"
                    :rate="coach.hourlyRate"
                    :areas="coach.areas">
                </coach-item>

            </ul>
            <h3 v-else>沒有教練喔</h3>
        </base-card>
    </section>

</template>

<script>
import CoachItem from '../../components/coaches/Coachitem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';

export default {
    components:{
        CoachItem,CoachFilter,
        BaseDialog,
    },
    data(){
        return {
            isloading: false,
            error: null,
            activeFilters:{
                frontend:true,
                backend: true,
                career: true,
            }
        }
    },
    computed:{
        isCoach(){
            return this.$store.getters['coaches/isCoach']
        },
        filteredCoaches(){
            // 這是一般沒有使用 namespaced 
            // return this.$store.getters.coaches

            // 'xxx/zzz' X為module的 key name;  z為module的getters methods
            const coaches = this.$store.getters['coaches/coaches']
            // filter 主要是跟針對
            return coaches.filter(coach=>{
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')){
                    return true
                }
                if(this.activeFilters.career && coach.areas.includes('career')){
                    return true
                }
                return false;
            })
        },
        hasCoaches(){
            return  !this.isloading && this.$store.getters['coaches/hasCoaches']
        }
    },
    created(){
        this.loadCoaches();
    },

    methods:{
        setFilters(updatedFilters){
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false){
            this.isloading = true;
            try{
                await this.$store.dispatch('coaches/loadCoaches',{forceRefresh: refresh}); 
            } catch(error){
                // 當try 裡面的內容有錯誤
                // catch error 也會出現try的內容錯誤
                this.error = error.message || '發生了一些錯誤!'
            }
            this.isloading = false;
        },
        handleError(){
            this.error = null
        },
    },

}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>