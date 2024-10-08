package kr.co.iei.convention.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="conventionCompany")
public class ConventionCompanyDTO {

    private int conventionCompanyNo;
    private int conventionNo;
    private String companyNo;
    private int seatNo;
}
