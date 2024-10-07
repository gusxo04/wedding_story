package kr.co.iei.advertisement.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.advertisement.model.dto.AdvertisementDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface AdvertisementDao {

	List activeAd();

	List endAd();

	List yetAd();

	List waitAd();

	int changeStartDate(String changeStartDate, int advertisementNo);

	int changeEndDate(String changeEndDate, int advertisementNo);

	int acceptAdvertisement(int advertisementNo);

	int refuseAd(int adNo);

	int insertAdvertisement(AdvertisementDTO advert);

	int totalCount(String companyNo);

	List<AdvertisementDTO> selectAdvertisementList(PageInfo pi, String companyNo);


}
