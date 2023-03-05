package com.tcmb.task.core.adapters;

import com.tcmb.task.core.helper.DateFormatter;
import com.tcmb.task.core.utilities.results.DataResult;
import com.tcmb.task.core.utilities.results.ErrorDataResult;
import com.tcmb.task.core.utilities.results.SuccessDataResult;
import com.tcmb.task.entities.concretes.Currency;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Component
public class TcmbServiceAdapter implements ITcmbServiceAdapter {
    @Async
    @Override
    public CompletableFuture<DataResult<List<Currency>>> getExchangeRate(String url) {
        List<Currency> currencies = new ArrayList<>();

        try {
            URL facultyURL = new URL("https://www.tcmb.gov.tr/kurlar/"+ url); // olmayan bır tarıh gırılırse catchle
            InputStream inputStream = facultyURL.openStream();
            //an instance of factory that gives a document builder  
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            //an instance of builder to parse the specified xml file  
            DocumentBuilder documentBuilder = dbf.newDocumentBuilder();
            Document document = documentBuilder.parse(inputStream);
            NodeList nodeList = document.getElementsByTagName("Currency");
            for (int itr = 0; itr < nodeList.getLength() - 1; itr++) {
                Node node = nodeList.item(itr);
                System.out.println("\nNode Name :" + node.getNodeName());
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) node;
                    currencies.add(new Currency(
                            0,
                            eElement.getElementsByTagName("Isim").item(0).getFirstChild().getTextContent(),
                            Double.valueOf(eElement.getElementsByTagName("ForexBuying").item(0).getFirstChild().getTextContent()),
                            Double.valueOf(eElement.getElementsByTagName("ForexSelling").item(0).getFirstChild().getTextContent()),
                            eElement.getAttribute("CurrencyCode"),
                            DateFormatter.dateConverter(document.getDocumentElement().getAttribute("Date")) 
                    ));
                }
            }
        } catch (Exception e) {
            return CompletableFuture.completedFuture(new ErrorDataResult<>(null, "Girilen tarihe ait kur bilgisi bulunamadı"));//throw new Exception("pagenotfound kur sayfasi hatasi yazilacak");
        }
        return CompletableFuture.completedFuture(new SuccessDataResult<>(currencies, "Kur bilgisi listelendi"));
    }
}
