'use strict';

const express = require('express');
const router = express.Router();
const url = 'https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx';
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const cModel = require('../models/comision.model');

router.post('/sbs', async (req, res) => {
  var arr = [];
  var arrayModel = [];
  var date;
  var periodo = req.body.periodo;
  try {
      const browser = await puppeteer.launch({
        'args': [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.type('#cboPeriodo', periodo);
      await page.click('input[type="submit"]');
      await page.waitForSelector('.JER_filaContenido');
      var html = await page.content();
      const $ = cheerio.load(html);
      $('tr.JER_filaContenido > td').toArray().map(item => {
        arr.push($(item).text().trim())
      });
      $('select.JERF_subtitulo2 > option').each(function () {
        if ($(this).attr('selected') == 'selected') {
          date = $(this).text();
          console.log("date ", date);
        };

      });

      for (var i = 0; i < arr.length; i++) {

        if (i == 0 || i == 8 || i == 16 || i == 24) {
          var model = new cModel();

          if (model.DenominacionRegimen = arr[i] === "HABITAT") {
            model.IdRegimenPensionario = 30;
          } else if (model.DenominacionRegimen = arr[i] === "INTEGRA") {
            model.IdRegimenPensionario = 8;
          }
          else if (model.DenominacionRegimen = arr[i] === "PRIMA") {
            model.IdRegimenPensionario = 14;
          }
          else if (model.DenominacionRegimen = arr[i] === "PROFUTURO") {
            model.IdRegimenPensionario = 12;
          }

          model.DenominacionRegimen = arr[i];//habitat, integra, prima, profuturo
          model.ComisionFija = arr[i + 1].slice(0, -1)
          model.ComisionFlujo = arr[i + 2].slice(0, -1)
          model.ComisionFlujoMixta = arr[i + 3].slice(0, -1)
          model.ComisionSaldo = arr[i + 4].slice(0, -1)
          model.PrimaSeguro = arr[i + 5].slice(0, -1)
          model.AporteObligatorio = arr[i + 6].slice(0, -1)
          model.RemuneracionTope = arr[i + 7].replace(",", "");

          arrayModel.push(model);
        }
      }

      var anio = date.substr(0, 4);
      var mes = date.substr(5, 3);

      res.status(200).send({
        ok: true,
        data: arrayModel,
        anio: anio,
        mes: mes
      });
      await browser.close();

    } catch (error) {
    console.log("try error " + error);
  }

});


module.exports = router;