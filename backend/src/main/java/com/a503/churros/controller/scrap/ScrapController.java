package com.a503.churros.controller.scrap;


import com.a503.churros.dto.scrap.ScrapFolderDTO;
import com.a503.churros.service.scrap.ScrapService;
import com.a503.churros.service.user.UserIdxFromJwtTokenService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scrap")
@Api("SCRAP API")
@RequiredArgsConstructor
@CrossOrigin
public class ScrapController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ScrapService ss;
    private final UserIdxFromJwtTokenService ts;

    @GetMapping("")
    public ResponseEntity<?> getScrap(
            @RequestHeader("Authorization")
            String token
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        List<ScrapFolderDTO> folderList = ss.getFolderList(userId);
        if(folderList == null){
            resultMap.put("empty" , true);
        }else{
            resultMap.put("empty" , false);
            resultMap.put("folder" , folderList);
        }
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/{scrapbookId}")
    public ResponseEntity<?> getScrap(
            @RequestHeader("Authorization")
            String token,
            @PathVariable(value = "scrapbookId") long scrapbookId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        List<Long> articleList = ss.getArticleList(scrapbookId, userId);
        if(articleList == null){
            resultMap.put("empty" , true);
        }else {
            resultMap.put("empty", false);
            resultMap.put("articles" , articleList);
        }
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<?> postScrapBook(
            @RequestHeader("Authorization")
            String token,
            String folderName
            ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        long folderIdx = ss.insertFolderName(userId , folderName);
        resultMap.put("folderIdx" , folderIdx);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
    @PutMapping("/book")
    public ResponseEntity<?> putScrapBooK(
            @RequestHeader("Authorization")
            String token,
            String folderName ,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        ss.changeFolderName(userId , folderName , folderIdx);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @DeleteMapping("/book")
    public ResponseEntity<?> deleteScrapBook(
            @RequestHeader("Authorization")
            String token,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        ss.deleteFolder(userId , folderIdx);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/article")
    public ResponseEntity<?> putScrapArticle(
            @RequestHeader("Authorization")
            String token,
            long folderIdx ,
            long articleIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        ss.saveArticle(userId , folderIdx , articleIdx);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
}