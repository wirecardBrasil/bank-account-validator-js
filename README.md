# Validador de contas bancárias

A validação da conta bancária é realizada sobre as regras dos seguintes bancos: Itaú, Bradesco, Banco do Brasil, Santander, Citibank e HSBC. Para os outros bancos é realizada uma validação padrão:
 * Agência de 1 até 5 números
 * Dígito da agência de 0 a 2 caracteres
 * Conta corrente de 1 até 12 números
 * Dígito da conta corrente de 0 a 2 caracteres

O número da agência e conta corrente dos bancos Itaú, Bradesco, e Banco do Brasil são validados através do cálculo do dígito verificador (semelhante a validação do CPF).

### Validador de conta bancária on-line
Você pode realizar a validação a qualquer momento através do site:
http://validadorbanco.com.br

# Implementação a validação em seu site

Para um funcionamento inicial, copie o trecho de código abaixo para sua página HTML. 


```html
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="https://cdn.rawgit.com/moip/bank-account-validator-js/master/dist/bank-account-validator.min.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $("#validate_bank_account").click(function() {
      Moip.BankAccount.validate({
        bankNumber         : $("#bank_number").val(),
        agencyNumber       : $("#agency_number").val(),
        agencyCheckNumber  : $("#agency_check_number").val(),
        accountNumber      : $("#account_number").val(),
        accountCheckNumber : $("#account_check_number").val(),
        valid: function() {
          alert("Conta bancária válida")
        },
        invalid: function(data) {
          var errors = "Conta bancária inválida: \n";
          for(i in data.errors){
            errors += data.errors[i].description + "-" + data.errors[i].code + ")\n";
          }
          alert(errors);
        }
      });
    });
  });
</script>
<form>
  <select id="bank_number">
    <option value="001">BANCO DO BRASIL S.A.</option>
    <option value="237">BANCO BRADESCO S.A.</option>
    <option value="341">BANCO ITAÚ S.A.</option>
    <option value="104">CAIXA ECONOMICA FEDERAL</option>
    <option value="033">BANCO SANTANDER BANESPA S.A.</option>
    <option value="399">HSBC BANK BRASIL S.A.</option>
    <option value="151">BANCO NOSSA CAIXA S.A.</option>
    <option value="745">BANCO CITIBANK S.A.</option>
  </select>

  <input id="agency_number" placeholder="Agência" type="text"/>
  <input id="agency_check_number" placeholder="Dígito da agência" type="text" />
  <input id="account_number" placeholder="Conta corrente" type="text" />
  <input id="account_check_number" placeholder="Dígito da conta corrente" type="text" />

  <input type="button" value="Validar" id="validate_bank_account" />
</form>
```

Lembrando que se estiver em ambiente de desenvolvimento é recomendável utilizar o arquivo validator.html.

### Tratamento de erros
Estes são os códigos de erro retornados quando uma conta bancária inválida é informada. Estas mensagens podem ser retornadas quando uma conta bancária do ITAÚ está totalmente inválida:
 * INVALID_AGENCY_NUMBER: A agência deve conter 4 números. Complete com zeros a esquerda se necessário
 * INVALID_AGENCY_CHECK_NUMBER: Dígito da agência inválido
 * INVALID_ACCOUNT_NUMBER: A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário
 * INVALID_ACCOUNT_CHECK_NUMBER: Dígito da conta corrente inválido
 * AGENCY_CHECK_NUMBER_DONT_MATCH: Dígito da agência não corresponde ao número da agência preenchido
 * ACCOUNT_CHECK_NUMBER_DONT_MATCH: Dígito da conta não corresponde ao número da conta/agência preenchido
 * INVALID_BANK_NUMBER: Banco inválido (quando o código do banco não possui entre 3 e 5 dígitos)

### Código dos bancos

A listagem de todos os bancos você pode obter em http://www.codigobanco.com.

# Contribuindo

Após realizar as mudanças do projeto, ou caso queira apenas executar o projeto localmente:

### Instalação de dependências
``` javascript
%> npm install
```

### Testes unitários
``` javascript
%> grunt
```

### Build
``` javascript
%> grunt build
```

### Executando a validação no browser
Após executar o build, basta abrir o arquivo validator.html no seu browser.

### Release (gera uma nova versão major/minor/patch)
Por exemplo, para a correção de um bug alterando a versão de 1.0.0 para 1.0.1, o comando seria:
``` javascript
%> grunt release:patch
```

Após este comando: 
- Arquivo com a nova versão será gerado em dist/bank-account-validator-MAJOR.MINOR.PATCH.min.js
- A nova versão ficará registrada no package.json no campo "version" 
