'use strict';

// Required modules
const nodeMailer  = require('nodemailer');
const unirest     = require('unirest');

// Function
exports.sendMail = function(req,res){

  // Enviroment variables
  const cfgEmailHost      = process.env.EMAILHOST     || null;
  const cfgEmailPort      = process.env.EMAILPORT     || null;
  const cfgSecure         = process.env.SECURE        || null;
  const cfgEmail          = process.env.EMAIL         || null;
  const cfgPassword       = process.env.PASSWORD      || null;
  const cfgSenderName     = process.env.SENDERNAME    || 'OPENFACT';
  const cfgSubject        = process.env.SUBJECT       || '[OPENFACT] Emisión de Comprobante Electrónico';
  const cfgsecretWord     = process.env.SECRETWORD    || null;
  const cfgRapidApiUrl    = process.env.RAPIDAPIURL   || null;
  const cfgRapidApiHost   = process.env.RAPIDAPIHOST  || null;
  const cfgRapiApidKey    = process.env.RAPIDAPIKEY   || null;

  // Parameters
  let mailSecret    = req.body.secretWord;
  let clientEmail   = req.body.clientEmail;
  let clientName    = req.body.clientName;
  let invoiceType   = req.body.invoiceType;
  let invoiceNumber = req.body.invoiceNumber;
  let invoiceDate   = req.body.invoiceDate;
  let invoiceAmount = req.body.invoiceAmount;
  let senderRuc     = req.body.senderRuc;
  let senderName    = req.body.senderName;
  let pdfFileb64    = req.body.pdfFileb64;
  let xmlFileb64    = req.body.xmlFileb64;

  // Validad enviroment variables
  if (cfgEmailHost      != null 
      && cfgEmailPort   != null 
      && cfgSecure      != null 
      && cfgEmail       != null 
      && cfgPassword    != null 
      &&cfgRapidApiUrl  != null 
      &&cfgRapidApiHost != null 
      &&cfgRapiApidKey  != null) 
  {
    
    // Validate parameters
    if (clientEmail       != null && clientEmail    != "" 
        && clientName     != null && clientName     != "" 
        && invoiceType    != null && invoiceType    != ""  
        && invoiceNumber  != null && invoiceNumber  != "" 
        && invoiceDate    != null && invoiceDate    != "" 
        && invoiceAmount  != null && invoiceAmount  != "" 
        && senderRuc      != null && senderRuc      != "" 
        && senderName     != null && senderName     != "" 
        && pdfFileb64     != null && pdfFileb64     != "" 
        && mailSecret     != null) 
    {

      // Validate secret word
      if (mailSecret == cfgsecretWord) {

        // Validate email
        unirest.get(cfgRapidApiUrl+clientEmail)
        .header("X-RapidAPI-Host", cfgRapidApiHost)
        .header("X-RapidAPI-Key", cfgRapiApidKey)
        .end(function (result) 
        {
          
          // Verify email
          if (result.body.isValid) 
          {
            // Email settings
            const transporter = nodeMailer.createTransport({
              host: cfgEmailHost,
              port: cfgEmailPort,
              secure: cfgSecure,  //true for 465 port, false for other ports
              auth: {
                user: cfgEmail,
                pass: cfgPassword
              }
            });

            // HTML Template
            let html_source = '<!doctype html>'
            html_source += '<html><head><meta name="viewport" content="width=device-width"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>';
            html_source += '<title>OPENFACT</title>';
            html_source += '<style>img{border: none; -ms-interpolation-mode: bicubic; max-width: 100%;}body{background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}table{border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;}table td{font-family: sans-serif; font-size: 14px; vertical-align: top;}.body{background-color: #f6f6f6; width: 100%;}.container{display: block; Margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px;}.content{box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;}.main{background: #ffffff; border-radius: 3px; width: 100%;}.wrapper{box-sizing: border-box; padding: 20px;}.content-block{padding-bottom: 10px; padding-top: 10px;}.footer{clear: both; Margin-top: 10px; text-align: center; width: 100%;}.footer td, .footer p, .footer span, .footer a{color: #999999; font-size: 12px; text-align: center;}h1, h2, h3, h4{color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; Margin-bottom: 30px;}h1{font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize;}p, ul, ol{font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;}p li, ul li, ol li{list-style-position: inside; margin-left: 5px;}a{color: #3498db; text-decoration: underline;}.btn{box-sizing: border-box; width: 100%;}.btn > tbody > tr > td{padding-bottom: 15px;}.btn table{width: auto;}.btn table td{background-color: #ffffff; border-radius: 5px; text-align: center;}.btn a{background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; /*text-transform: capitalize;*/}.btn-primary table td{background-color: #3498db;}.btn-primary a{background-color: #3498db; border-color: #3498db; color: #333333;}.btn-warning a{background-color: gold; border-color: goldenrod; color: #333333;}.last{margin-bottom: 0;}.first{margin-top: 0;}.align-center{text-align: center;}.align-right{text-align: right;}.align-left{text-align: left;}.clear{clear: both;}.mt0{margin-top: 0;}.mb0{margin-bottom: 0;}.preheader{color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;}.powered-by a{text-decoration: none;}hr{border: 0; border-bottom: 1px solid #f6f6f6; Margin: 20px 0;}@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}@media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #34495e !important;}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important;}}dl{margin-top: 0; margin-bottom: 20px;}dt, dd{line-height: 1.42857143;}dt{font-weight: bold;}dd{margin-left: 0;}@media (min-width: 768px){.dl-horizontal dt{float: left; width: 160px; overflow: hidden; clear: left; text-align: left; text-overflow: ellipsis; white-space: nowrap;}.dl-horizontal dd{margin-left: 180px;}}</style>';
            html_source += '</head> <body class=""><table border="0" cellpadding="0" cellspacing="0" class="body">';
            html_source += '<tr> <td>&nbsp;</td><td class="container"> <div class="content"> <span class="preheader">OPENFACT - FACTURACIÓN ELECTRÓNICA </span>';
            html_source += '<table class="main"><tr> <td class="wrapper">';
            html_source += '<table border="0" cellpadding="0" cellspacing="0">';
            html_source += '<tr> <td style="text-align: center;background-color: #333;padding: 30px 10px;"> <img src="https://www.openfact.pe/images/home_logo.png" alt=""> </td></tr>';
            html_source += '<tr> <td style="padding-top: 30px;"> ';
            html_source += '<p>Estimado Sr./Sra. <strong>' + clientName + '</strong></p>';
            html_source += '<p>Le informamos que su comprobante de pago electrónico ya se encuentra disponible.</p>';
            html_source += '<dl class="dl-horizontal">';
            html_source += '<dt><strong>Tipo de Comprobante</strong></dt>';
            html_source += '<dd>: '+ invoiceType + '</dd>';
            html_source += '<dt><strong>Serie y Número</strong></dt>';
            html_source += '<dd>: '+ invoiceNumber + '</dd>';
            html_source += '<dt><strong>R.U.C. Emisor</strong></dt>'; 
            html_source += '<dd>: ' + senderRuc + '</dd>';
            html_source += '<dt><strong>Emisor</strong></dt>'; 
            html_source += '<dd>: ' + senderName + '</dd>';
            html_source += '<dt>Fecha de Emisión</dt>';
            html_source += '<dd>: ' + invoiceDate + '</dd>';
            html_source += '<dt>Monto Total:</dt>';
            html_source += '<dd>: ' + invoiceAmount + '</dd> </dl>';
            html_source += '<table border="0" cellpadding="0" cellspacing="0" class="btn btn-warning">';
            html_source += '<tbody> <tr> <td align="left">';
            html_source += '<table border="0" cellpadding="0" cellspacing="0"><tbody>';
            html_source += '<tr > <td style="background-color: goldenrod;"> <a href="https://www.openfact.pe" target="_blank">Ver comprobante en OpenFact</a> </td>';
            html_source += '</tr></tbody> </table> </td></tr></tbody> </table>';
            html_source += '<p>Equipo de OpenFact. <br><small style="color: grey;">Sistema de Facturación Electrónica</small></p>';
            html_source += '</td></tr></table> </td></tr></table><div class="footer">';
            html_source += '<table border="0" cellpadding="0" cellspacing="0">';
            html_source += '<tr> <td class="content-block"> <span class="apple-link">Emite tus comprobantes electrónicos de manera fácil, rápida y gratuita.</span>';
            html_source += '<br>Para más información, ingresa a: <br><a target="_blank" href="https://www.openfact.pe">www.openfact.pe</a>. </td></tr>';
            html_source += '<tr> <td class="content-block powered-by"> Powered by <a target="_blank" href="https//www.openfact.pe">OpenFact</a>. </td></tr></table> </div></div></td>';
            html_source += '<td>&nbsp;</td></tr></table></body></html>';

            // Send mail
            const mailOptions = {
              from    : '"'+cfgSenderName+'" <'+cfgEmail+'>', // sender address
              to      : clientEmail, // list of receivers, multiple mails separated by commas
              subject : cfgSubject, // Subject line
              text    : cfgSenderName, // plain text body
              html    : html_source, // html body
              attachments: [

                {   // encoded string as an attachment
                    filename: invoiceNumber + '.xml',
                    content: xmlFileb64,
                    encoding: 'base64'
                }
                ,
                {   // encoded string as an attachment
                    filename: invoiceNumber + '.pdf',
                    content: pdfFileb64,
                    encoding: 'base64'
                }
              ]
            };

            // Send status
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.json({ success: false , message: "Ocurrió un problema => " + error});
                //res.status(400).send(error);
              } else {
                console.log('Message %s sent to: %s from: %s', info.messageId, mailOptions.to, mailOptions.from);
                //console.log('Message %s sent: %s', info.messageId, info.response);
                //res.status(200).send(info);
                res.json({ success: true , message: "Mensaje Enviado"});
              }
            });

          } else {
            res.json({ success: false , message: "Dirección de correo inválida"});
          }

        });

      } else {        
        res.json({ success: false , message: "Palabra Secreta incorrecta"});
      }

    }
    else{
      res.json({ success: false , message: 'Verifique los parámetros.'});
    }

  } else {
    res.json({ success: false , message: 'No se definieron las variables de entorno.'});
  }

} 