package com.dt.behuuchiencar.model.response;

import java.util.List;

import com.dt.behuuchiencar.model.History;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoryResponse {
    private List<History> histories;
    private Long revenue;
}
