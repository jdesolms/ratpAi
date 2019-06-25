from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

def scrapForLine(line):
    req = Request('https://www.ratp.fr/trafic-metro', headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()

    page_content = BeautifulSoup(webpage, "html.parser")

    info_trafic = page_content.findAll('div',attrs={"class":"infos-trafic__item"})

    phrase ='Pour la ligne {} le site de la RATP me dit: '.format(line)

    for info in info_trafic:
        if len(info.findAll('span', attrs={"data-ratp-line-key": line})) > 0 :
            results = info.findAll('p')
            for result in results : 
                phrase += result.text
                phrase += '\n'
            return phrase
        else :
            phrase += 'qu\'il n\'y à pas de souci sur votre ligne.'
            return phrase
    return 'Je n\'ai rien pour vous.'

