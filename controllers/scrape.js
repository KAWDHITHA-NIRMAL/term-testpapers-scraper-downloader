import axios from "axios"
import { load } from "cheerio"

const scrape_uris = async (grade, subject) => {
  try {
    const _conf = { timeout: 0, waitUntil: 'load' };
    const _fr = await axios.get(`https://pastpapers.wiki/grade-${grade}-${subject}`.toLowerCase().trim(), _conf);

    if (_fr.status !== 200) return [];

    const $ = load(_fr.data);
    const fr_arr = [];

    $('ul li strong a').each(function () {
      let _txt = $(this).text();
      let _href = $(this).attr('href');

      if (!(_txt.split(' ').includes('Paper') || _txt.split(' ').includes('paper'))) return;
      if (!_href) return;
      if (fr_arr.includes(_href)) return;
      else fr_arr.push(_href);
    });

    const sr_arr = [];
    for (let i in fr_arr) {
      const _sr = await axios.get(fr_arr[i].trim());
      if (_sr.status !== 200) continue;

      const $$ = load(_sr.data);
      let _link = $$('.wpfd_downloadlink').attr('href');

      if (!_link) continue;
      sr_arr.push(_link);
    }

    return sr_arr;
  } catch (err) {
    throw new Error(err);
  }
};

export { scrape_uris }