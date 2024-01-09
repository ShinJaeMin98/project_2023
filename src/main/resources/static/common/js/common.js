var commonLib = commonLib || {};

/**
* ajax 처리
*
* @param method : 요청 메서드 - GET, POST, PUT ...
* @param url : 요청 URL
* @param params :요청 데이터 - POST, PUT, PATCH...
* @param responseType : json - 응답 결과를 json 변환, 아닌 경우는 문자열로 반환
*/
commonLib.ajaxLoad = function(method, url, params, responseType) {
    method = !method || !method.trim()? "GET" : method.toUpperCase();
    const token = document.querySelector("meta[name='_csrf']").content;
    const header = document.querySelector("meta[name='_csrf_header']").content;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader(header, token);

        // 요청 body에 실릴 데이터 키=값&키=값& .... FormData 객체 (POST, PATCH, PUT)
        xhr.send(params);
        responseType = responseType?responseType.toLowerCase():undefined;
        if (responseType == 'json') {
            xhr.responseType=responseType;
        }

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == XMLHttpRequest.DONE) {
                const resultData = responseType == 'json' ? xhr.response : xhr.responseText;

                resolve(resultData);
            }
        };

        xhr.onabort = function(err) {
            reject(err);    // 성공시 응답 데이터
        };

        xhr.onerror = function(err) {
            reject(err);    // 중단시
        };

        xhr.ontimeout = function(err) {
            reject(err);    // 요청 또는 응답시 오류 발생
        };
    });
};

/**
*   위지웍 에디터 로드
*
*/
commonLib.loadEditor = function (id, height) {
    if (!id) {
        return;
    }
    height = height || 450;

    // ClassicEditor
    return ClassicEditor.create(document.getElementById(id), {
        height
    });
}