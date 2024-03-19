package com.dt.behuuchiencar.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemplateContract {
    private Long id;
    private String name;
    private String phone;
    private String address;
    private String signatureImage;
    private int prepay;
    private Long maximumDistance;
    private int surcharge;
}
