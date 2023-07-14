import axios from "axios"
import { load } from "cheerio"

const scrape = async (grade, subject) => {
    try {
        // axios config
        const _conf = { timeout: 0, waitUntil: 'load' }
        const _fr = await axios.get(`https://pastpapers.wiki/grade-10-ict`, _conf)
        if (_fr.status !== 200) return;
        console.log(_fr.status)
        const $ = load(_fr.data)
        const fr_arr = []

        $('ul li strong a').each(function () {
            let _txt = $(this).text()
            let _href = $(this).attr('href')
            if (!(_txt.split(' ').includes('Paper') || _txt.split(' ').includes('paper'))) return;
            if (!_href) return;
            if (fr_arr.includes(_href)) return; else fr_arr.push(_href);
        })
        try {
            console.log(fr_arr)
            const sr_arr = []
            for (let i in fr_arr) {
                const _sr = await axios.get(fr_arr[i].trim())
                if (_sr.status !== 200) return;
                const $$ = load(_sr.data)
                let _link = $$(".wpfd_downloadlink").attr('href')
                if(!_link)return;
                sr_arr.push(_link)
            }
           
        }
        catch (err) {
            throw new Error(err)
        }
    }
    catch (err) {
        throw new Error(err)
    }
}

export { scrape }