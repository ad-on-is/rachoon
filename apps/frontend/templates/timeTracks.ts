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
          font-size:10pt;
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
      <div class="column"></div>
        <div class="column has-text-right"><img src="{{organization.data.logo}}" id="logo" /></div>
      </section>
      </header>

      <table style="width: 100%" id="page">
      <thead><tr><td></td></tr></thead>
      <tbody><tr><td>
        <main class="content">
        <section class="section content">
          <h1>TimeTracks</h1>
          <table class="table is-fullwidth is-narrow positions is-striped">
            <thead>
              <tr>
                <td width="130">{{ t('project') }}</td>
                <td>{{t('description')}}</td>
                <td width="120">{{t('user')}}</td>
                <td width="50" class="has-text-right">{{ t('date') }}</td>
                <td width="50" class="has-text-right">{{ t('duration') }}</td>
              </tr>
            </thead>
            <tbody>
              {% for timeTrack in object.timeTracks %}
              <tr>
                <td>{{timeTrack.project.data.title}}</td>
                <td><p>{{timeTrack.data.title}}</p><div class="text">{{timeTrack.data.description | safe}}</div></td>
                <td>{{timeTrack.user.data.fullName}}</td>
                <td class="has-text-right">{{format.date(timeTrack.date)}}</td>
                <td class="has-text-right">{{format.duration(timeTrack.data.minutes)}}</td>
                
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
              <td><h4>{{ t('duration total') }}</h4></td>
                <td class="has-text-right">{{format.duration(object.totalMinutes)}}</td>
              </tr>
              
            </tbody>
          </table>
            </div>
          </div>
          </section>
        </main>
  
      </td></tr>
      <tfoot><tr><td></td></tr></tfoot>
      </table>
      </body>
    </html>
      `,
}
