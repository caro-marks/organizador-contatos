<template>
  <div class="container">
    <Menu />
    <table class="contacts-table">
      <thead>
        <tr>
          <th>Domínios</th>
          <th>Emails</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in this.groupedMails" :key="group.id">
          <td>
            {{ group.domain }}
          </td>
          <td>
            <ul>
              <li v-for="mail in group.mails" :key="mail.id">
                {{ mail }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "Emails",
  components: {
    Menu
  },
  data() {
    return {
      contatos: []
    };
  },

  created() {
    this.getContacts();
    this.getOtherContacts();
  },

  methods: {
    getContacts() {
      this.$gAuth.Gapi.client.people.people.connections
        .list({
          resourceName: "people/me",
          personFields: "emailAddresses"
        })
        .then(mails => {
          const Contatos = mails.result.connections;
          this.appendContacts(Contatos);
          console.log("Contatos concluído.");
        });
    },

    getOtherContacts() {
      this.$gAuth.Gapi.client.people.otherContacts
        .list({
          readMask: "emailAddresses"
        })
        .then(mails => {
          const Contatos = mails.result.otherContacts;
          this.appendContacts(Contatos);
          console.log("Outros contatos concluído.");
        });
    },

    appendContacts(Contacts) {
      for (let contact of Contacts) {
        if (contact.emailAddresses) {
          this.contatos.push(contact.emailAddresses[0].value);
        }
      }
    },

    groupContacts(contacts) {
      const grupos = contacts.reduce((acumulator, email) => {
        const [name, domain] = email.split("@");
        const group = acumulator[`@${domain}`] ?? [];
        acumulator[`@${domain}`] = [...group, name];
        return acumulator;
      }, {});

      for (let grupo in grupos) {
        this.emails.push({ domain: grupo, mails: grupos[grupo] });
      }
      console.log("Emails prontos.");
    }
  },
  computed: {
    groupedMails() {
      const emails = [];

      const grupos = this.contatos.reduce((acumulado, email) => {
        const [name, domain] = email.split("@");
        const group = acumulado[`@${domain}`] ?? [];
        acumulado[`@${domain}`] = [...group, name];
        return acumulado;
      }, {});

      for (let grupo in grupos) {
        emails.push({ domain: grupo, mails: grupos[grupo] });
      }
      console.log("dados computados com sucesso!");

      return emails;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0 0.2rem;
  height: 94%;
}
.contacts-table {
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 1.1em;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width: 60%;
  max-width: 800px;
  background-color: #5caf63;
}
.contacts-table thead tr {
  background-color: #087f23;
  color: #ffffff;
  text-align: left;
}
.contacts-table th,
.contacts-table td {
  padding: 12px 15px;
}

.contacts-table tbody tr {
  border-bottom: thin solid limegreen;
}

.contacts-table tbody tr:nth-of-type(even) {
  background-color: #4caf50;
}

.contacts-table tbody tr:hover {
  font-weight: bold;
  color: darkgreen;
}
</style>
