<template>
    <div class="container">
        <Menu />
        <section>
            <h2 class="title">Emails</h2>
        </section>
        <section>            
            <ol class="lista">
                <li
                    class="lista-item"
                    v-for="(nicks, dominio) in emails"
                    :item="dominio"
                    :index="nicks"
                    :key="dominio.id">
                </li>
            </ol>
        </section>       
    </div>
</template>

<script>
    import Menu from '@/components/Menu';
    export default {
        name: 'Emails',
        components: {
            Menu
        },
        data() {
            
            return {
                emails : {}
            }
        },
        /*

        created() {
            this.$gAuth.listEmails()
            .then(res => this.emails = res.json(), err => console.log(err))
        }
        */
        created () {

                
            const contatos = this.$gAuth.listEmails();
            if (contatos.length > 0) {
                for (let i = 0; i < contatos.length; i++) {
                    const avatar = contatos[i];
                    const address = avatar.emailAddresses
                    if (address && address.length > 0) {
                        const email = String(address[0].value)
                        const nick = email.substring(0, email.lastIndexOf('@'))
                        const domain = email.substring(email.lastIndexOf('@'))
                        if (!this.emails[domain]) {
                            this.emails[domain] = []
                        }
                        this.emails[domain].push(nick)
                    }
                }
            } 
        }
    }
    
</script>

<style>
    .container {
        padding: 0 0.2rem;
        height: 94%;
    }

    .title {
        text-align: -webkit-center;
        color: darkgreen;
    }

    .lista {
        list-style: none;
        align-items: flex;
        flex-direction: column;
        margin-top: 2rem;
    }

    .lista .lista-item {
        display: inline-block;
    }

</style>