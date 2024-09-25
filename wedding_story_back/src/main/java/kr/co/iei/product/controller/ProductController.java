package kr.co.iei.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import kr.co.iei.product.model.service.ProductService;
import kr.co.iei.util.FileUtils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	public String root;
	
	
	@GetMapping("/product/{reqPage}")
	public ResponseEntity<Map> getProductList(@PathVariable int reqPage) {
		Map map = productService.getProductList(reqPage);
		return ResponseEntity.ok(map);
	}
	
}
