package com.tcmb.task.core.adapters;

import com.tcmb.task.core.utilities.results.DataResult;
import com.tcmb.task.entities.concretes.Currency;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ITcmbServiceAdapter {

    CompletableFuture<DataResult<List<Currency>>> getExchangeRate(String url);
}
