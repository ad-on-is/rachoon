export default {
	default: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Invoice</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-print@1.0.0/css/bulma-print.css">
        
        <style>
    
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;600;700;800;900&display=swap');
    
          @media print {
            @page {
              size: A4 portrait;
              margin: 0mm 0 0mm 0;
              position: relative;  
              
            }
      
      
            a[href]:after {
              display: none !important;
            }
      
            
            
      
          }
  
    
  
        body, html {
          font-size:11pt;
          position: relative;
        }
        body, html, #outer {
          height: 100%;
        }

        body, html, table tbody td {
          color: {{organization.settings.style.colors.bodyText}}; 
        }
        .meta p, .positions .text {
          font-size: 10pt;
        }
  
        header {
          position: fixed;
          top: 0;
          width: 100%;
          font-size: 8pt;
          background-color: {{organization.settings.style.colors.headerBackground}} !important;
          color: {{organization.settings.style.colors.headerText}} !important;
        }
  
        #page > thead td, header {
          height: 25mm;
        }
  
        #page > tfoot td, footer {
          height: 25mm;
        }
  
        footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          font-size: 8pt;
          background-color: {{organization.settings.style.colors.footerBackground}} !important;
          color: {{organization.settings.style.colors.footerText}} !important;
        }
  
        
  
          main {
            font-family: "Roboto", arial, sans-serif;
          }

          main, header, footer {
            padding-left: 10mm;
            padding-right: 10mm;
          }
    
          h1{
            font-family: "Montserrat", arial, sans-serif;
            font-weight: 900;
            color: {{organization.settings.style.colors.primary}} !important;
          }
    
          h2,h3,h4,h5,h6 {
            font-weight: 600;
            color: {{organization.settings.style.colors.primary}} !important;
          }

          .section {
            padding-top:5mm;
            padding-bottom: 5mm;
            
          }

          header section, footer section {
            padding-left: 10mm;
            padding-right: 10mm;
          }
  
  
          .positions {
            margin-top: 30px;
          }
  
         
    
          header #logo {
            width: auto;
            height: 15mm;
          }
  
  
  
          .table thead td {
            color: {{organization.settings.style.colors.primary}} !important;
          }
          .table td {
            border-color: {{organization.settings.style.colors.border}} !important;
          }

          table.positions tbody tr:nth-child(odd) td {
            background:{{organization.settings.style.colors.tableOddBackground}};
          }

          table.positions tbody tr:nth-child(even) td {
            background: {{organization.settings.style.colors.tableEvenBackground}};
          }
  
          hr {
            background-color: {{organization.settings.style.colors.border}} !important;
          }

          .meta h3, .totals h4 {
            color: {{organization.settings.style.colors.secondary}} !important;
          }
  
          .page-number:after {
            content: counter(page);
          }
    
        </style>
      </head>
      <body>
      
      <header class="section">
      <section class="columns">
      <div class="column"><p>{{organization.name}}<br />{% if organization.data.info.addition %}{{organization.data.info.addition}}<br />{% endif %}{{organization.data.address.street}}<br />{{organization.data.address.zip}} {{organization.data.address.city}}, {{organization.data.address.country}}</p></div>
        <div class="column has-text-right"><img src="{{organization.data.logo}}" id="logo" /></div>
      </section>
      </header>
      <footer class="section">
        <section class="columns">
          <div class="column">{{organization.data.columns.first | urlize | safe}}</div>
          <div class="column">{{organization.data.columns.second | urlize | safe}}</div>
          <div class="column">{{organization.data.columns.third | urlize | safe}}</div>
        </section>
      </footer>

      <table style="width: 100%" id="page">
      <thead><tr><td></td></tr></thead>
      <tbody><tr><td>
        <main class="content">
          <section class="columns section meta">
           
            <div class="column">
              <p>{{object.client.name}}<br />{{object.client.data.info.addition}}<br />{{object.client.data.contactPerson.fullName}}<br />{{object.client.data.address.street}}</br>{{object.client.data.address.zip}} {{object.client.data.address.city}}<br />{{object.client.data.address.country}}</p>
            </div>
            <div class="column">
            <h3>{{t('no')}} {{object.number}}</h3>
            <div class="columns">
              <div class="column">
                <p>{{ t('date') }}<br/>
                {{ t('due on') }}<br/>
                {{ t('your VAT') }}
                </p>
                
              </div>
              <div class="column has-text-right">
                <p>{{format.date(object.data.date)}}<br />
                {{format.date(object.data.dueDate)}}<br />
                {{object.client.data.info.vat}}</p>
              </div>
              </div>
            </div>
          </section>
        <section class="section content">
          <h1>{{ t(object.type) }}</h1>
          {% if object.data.headingText %}
          <div class="is-together-print">{{object.data.headingText | urlize | safe}}</div>
          {% endif %}
          <table class="table is-fullwidth is-narrow positions is-striped">
            <thead>
              <tr>
                <td width="40">{{ t('pos') }}</td>
                <td>{{t('description')}}</td>
                <td width="100" class="has-text-right">{{ t('quantity') }}</td>
                <td width="150" class="has-text-right">{{ t('unit price') }}</td>
                <td width="150" class="has-text-right">{{ t('total price') }}</td>
              </tr>
            </thead>
            <tbody>
              {% for position in object.data.positions %}
              <tr>
                <td>{{ loop.index }}.</td>
                <td><p>{{position.title}}</p><div class="text">{{position.text | safe}}</div></td>
                <td class="has-text-right">{{position.quantity}} {{position.unit}}</td>
                <td class="has-text-right">{{format.currency(position.price)}}</td>
                <td class="has-text-right">{{format.currency(position.total)}}</td>
              </tr>
              {%endfor%}
            </tbody>
          </table>
          <hr />
          <div class="columns is-together-print">
            <div class="column"></div>
            <div class="column">
              <table class="table totals">
                <tbody>
                  <tr>
                    <td>{{ t('subtotal') }}</td>
                    <td class="has-text-right">{{format.currency(object.data.netNoDiscount)}}</td>
                  </tr>
                  {% for discountOrCharge in object.data.discountsCharges %}
                  <tr>
                  <td>{{ '-' if discountOrCharge.type == 'discount' else '+' }} {{discountOrCharge.title}}</td>
                  <td class="has-text-right">{{format.currency(discountOrCharge.amount)}}</td>
                  </tr>
                  <tr>
                    <td>{{ t('net') }}</td>
                    <td class="has-text-right">{{format.currency(object.data.net)}}</td>
                  </tr>
                  {%endfor%}
                  {% for rate,tax in object.data.taxes %}
                  <tr>
                  <td>{{ t('incl. tax') }} {{rate}}%</td>
                  <td class="has-text-right">{{format.currency(tax)}}</td>
                  </tr>
                  {%endfor%}
                  
                  <tr>
                    <td><h4>{{ t('sum total') }}</h4></td>
                    <td class="has-text-right"><h4>{{format.currency(object.data.total)}}</h4></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {% if object.data.footerText %}
          <hr />
          <div class="is-together-print">{{object.data.footerText | urlize | safe}}</div>
          {% endif %}
          <h3>{{t('Payment conditions')}}</h3>
          <p>{{t('Payment within %d days.', object.data.dueDays)}}</p>
          </section>
        </main>
  
      </td></tr>
      <tfoot><tr><td></td></tr></tfoot>
      </table>
      </body>
    </html>
      `,
}
