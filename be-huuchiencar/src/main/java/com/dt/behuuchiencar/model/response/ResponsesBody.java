package com.dt.behuuchiencar.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponsesBody {
    private Integer code;
    private List<Object> message;
    private List<Object> data; 
}
