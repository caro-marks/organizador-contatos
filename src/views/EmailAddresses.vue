<template>
    <div class="container">
        <Menu />
        <section>
            <a class="title" @click.prevent="Organizer">
                <strong>Organizar Emails</strong>
            </a>
        </section>
        <section>                 
            <ol class="lista">
                <li
                    class="lista-item"
                    v-for="(nicks, dominio) in emails"
                    v-bind:item="dominio"
                    v-bind:index="nicks"
                    v-bind:key="dominio.id">
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
        // methods: {
        //     Organizer () {
        //         const contatos = this.$gAuth.listEmails();
        //         if (contatos.length > 0) {
        //             for (let i = 0; i < contatos.length; i++) {
        //                 const avatar = contatos[i];
        //                 const address = avatar.emailAddresses
                        
        //                 if (address && address.length > 0) {
        //                     const email = String(address[0].value)
        //                     const nick = email.substring(0, email.lastIndexOf('@'))
        //                     const domain = email.substring(email.lastIndexOf('@'))
        //                     if (!this.emails[domain]) {
        //                         this.emails[domain] = []
        //                     }
        //                     this.emails[domain].push(nick)
        //                 }
        //             }
        //         }

        //     }
        // }
        /*

        created() {
            this.$gAuth.listEmails()
            .then(res => this.emails = res.json(), err => console.log(err))
        }
        
        created () => {

                
            var contatos = this.$gAuth.listEmails();
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
        }*/
    }
    
</script>

<style>
    .container {
        padding: 0 0.2rem;
        height: 94%;
    }
    
    a {
        background-color: #5caf63;
        cursor: pointer;
        padding: 0.5em 0;
        transition: 0.3s;
        font-size: 17px;
        border: 1px solid limegreen;
    }

    .title {
        text-align: -webkit-center;
        color: darkgreen;
        box-sizing: border-box;
        border-radius: 5px;
        display: inline-block;
        width: 45%;
        text-align: center;
        position: inherit;
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