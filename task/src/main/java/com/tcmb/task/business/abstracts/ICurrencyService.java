package com.tcmb.task.business.abstracts;

import com.tcmb.task.core.utilities.results.DataResult;
import com.tcmb.task.entities.concretes.Currency;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ICurrencyService {
    CompletableFuture<DataResult<List<Currency>>> getAll(String url, LocalDate date);
}

