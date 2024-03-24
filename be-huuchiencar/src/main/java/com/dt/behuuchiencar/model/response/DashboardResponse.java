package com.dt.behuuchiencar.model.response;

import java.util.List;

import com.dt.behuuchiencar.model.Car;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponse {
    private List<Car> cars;
    private Long revenue;
}
