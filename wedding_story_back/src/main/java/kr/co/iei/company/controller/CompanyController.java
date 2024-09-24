package kr.co.iei.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;
import kr.co.iei.company.model.service.CompanyService;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/company")
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	
	@PostMapping
	public ResponseEntity<Boolean> insertCompany(@ModelAttribute CompanyDTO company,@ModelAttribute KeyWordDTO keyWord, @ModelAttribute MultipartFile thumbFile){
		//썸네일 파일은 String으로 받을수 없음 -> MultipartFile로 thumbFile라는 객체로 받은 후 
		//아래 로직을 통해서 savepath 로 실제 저장장소경로를 등록해주고  fileUtil을 통해서 savepath(저장경로)에thumbFile(실제 파일)을 업로드 해주고 저장된 경로를 filepath리턴받는다.
		//리턴받은 값을 company.CompanyThumb에 set 해준다. 
		
		
		if(thumbFile != null) {
			String savepath = root+"/company/thumb/";					//경로 등록
			String filepath = fileUtil.upload(savepath, thumbFile); //경로에 저장
			System.out.println(filepath);
			company.setCompanyThumb(filepath); 						//company에 추가
		}
		String exam = "b1222";		//업체코드 발급전 임시적으로 사용
		company.setCompanyNo(exam);
		keyWord.setCompanyNo(exam);
		System.out.println(company); // 데이터 정상적으로 들어오는지 확인
		System.out.println(keyWord); // 데이터 정상적으로 들어오는지 확인
		
		
		int result = companyService.insertCompany(company,keyWord);
		
		return ResponseEntity.ok(result == 2);
	}
	
	@GetMapping
	public ResponseEntity<CompanyDTO> selectCompanyInfo(){
		CompanyDTO company = companyService.selectCompanyInfo();
		
		return ResponseEntity.ok(company);
	}
	
	
}
