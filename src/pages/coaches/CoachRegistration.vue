<template>
    <section>
        <base-card>
            <h2>馬上註冊教練!</h2>
            <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</template>

<script>
import CoachForm from '../../components//coaches/CoachForm';

export default {
    components:{
        CoachForm,
    },
    methods:{
        // coach-form emits 將form data 傳過來,這裡要給予變數來接住的值
        saveData(data){
            this.$store.dispatch('coaches/registerCoach',data);
            this.$router.replace('/coaches')
        },
    }
}
</script>