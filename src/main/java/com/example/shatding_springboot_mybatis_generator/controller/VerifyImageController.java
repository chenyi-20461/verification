package com.example.shatding_springboot_mybatis_generator.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shatding_springboot_mybatis_generator.util.Result;
import com.example.shatding_springboot_mybatis_generator.util.VerifyImageUtil;
/**
 * 
 *  说明：生成图片验证码
 *  @author:heshengjin qq:2356899074 
 *  @date 2020年8月11日 上午10:58:41
 */
@RestController
public class VerifyImageController {
	
	@SuppressWarnings("static-access")
	@RequestMapping("/capture/img")
	public Result captureImg(HttpServletResponse httpServletResponse,HttpServletRequest httpServletRequest) throws Exception{
			   Map<String, Object> captureImgTemp = VerifyImageUtil.pictureTemplatesCut(
					   new ClassPathResource(String.format(VerifyImageUtil.CLASSPATHURL_TEMPLATE, VerifyImageUtil.getTemplateIndex())).getFile(),
					   new ClassPathResource(String.format(VerifyImageUtil.CLASSPATHURL_TARGET, VerifyImageUtil.getTargetIndex())).getFile(),
					   VerifyImageUtil.CLASSPATHURL_TEMPLATE_EX_PNG,
					   VerifyImageUtil.CLASSPATHURL_TARGET_EX_JPG);
//				ServletOutputStream out;
//		        out = httpServletResponse.getOutputStream();
		        //oriCopyImage（有抠图的图片） newImage（滑块）
//		        out.write(captureImgTemp.get("newImage"));
//		        out.flush();
//		        out.write((Byte)captureImgTemp.get("oriCopyImage"));
//		        out.flush();
//		        out.close();
                                
		 return  new Result().success(captureImgTemp);
	}
	
}
