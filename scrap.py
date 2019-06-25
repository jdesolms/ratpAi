from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

def scrapForLine(line):
    req = Request('https://www.ratp.fr/trafic-metro', headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()

    page_content = BeautifulSoup(webpage, "html.parser")

    info_trafic = page_content.findAll('div',attrs={"class":"infos-trafic__item"})
    print(info_trafic)

    for info in info_trafic:
        phrase = 'Le site de la ratp indique : {}'.format(info.findAll('strong')[0].text)
    
        return phrase
    return 'Je n\'ai rien pour vous'

