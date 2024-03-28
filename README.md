# 한국해양대 캡스톤디자인2 <br> (Yolo v7을 활용한 폐기물 처리 웹사이트)
## 전처리단계

### 1. 데이터 선정
 * 분석 대상 데이터로 AI허브에서 수집한 생활폐기물 이미지 중 가구류(밥상, 서랍장, 소파, 의자, 장롱, 책상)를 선정
 * 총 6000장의 이미지를 확보
### 2. 데이터 라벨링 형식 확인
 * 라벨링된 JSON 파일들을 분석한 결과, 처음에는 x1, x2, y1, y2로만 경계 상자가 정의되어 있다고 생각했으나, 실제로는 여러 개의 PolygonPoint가 존재하는 파일이 있음을 확인

```json
"Bounding": [
    {
      "CLASS": "가구류",
      "DETAILS": "소파",
      "DAMAGE": "일부훼손",
      "TRANSPARENCY": "불투명",
      "Color": "191/154/185",
      "Shape": "다면체",
      "Texture": "딱딱함",
      "Object Size": "대",
      "Direction": "원거리",
      "Drawing": "BOX",
      "x1": "225",
      "y1": "509",
      "x2": "985",
      "y2": "1121"
    }
  ]
```

```json
"Bounding": [
    {
      "CLASS": "가구류",
      "DETAILS": "서랍장",
      "DAMAGE": "원형",
      "TRANSPARENCY": "불투명",
      "Color": "140/150/158",
      "Shape": "직육면체",
      "Texture": "딱딱함",
      "Object Size": "중",
      "Direction": "정면",
      "Drawing": "POLYGON",
      "PolygonCount": "8",
      "PolygonPoint": [
        {
          "Point1": "568,151"
        },
        {
          "Point2": "442,416"
        },
        {
          "Point3": "472,696"
        },
        {
          "Point4": "454,744"
        },
        {
          "Point5": "505,936"
        },
        {
          "Point6": "1315,971"
        },
        {
          "Point7": "1449,484"
        },
        {
          "Point8": "1358,222"
        }
      ]
    }
  ]
```

### 3. YOLOv7 학습을 위한 TXT 파일 작성
 * YOLOv7에 학습시킬 때 사용할 TXT 파일을 작성하기 위해 기존 json의 데이터를 처리
 * 이를 통해 이미지와 해당 이미지에 존재하는 객체의 경계 상자 정보를 표현하는 텍스트 파일을 생성

 ```txt
 2 0.4201388888888889 0.42447916666666663 0.5277777777777778 0.31875000000000003
 ```
  소파 1.json을 변환한 결과(Rect)
  ```txt
1 0.4257091400270148 0.5194444444444444 0.4533993696533093 0.7592592592592592
 ```
 서랍장 0.json을 변환한 결과(Polygon)


 ### 4. BoundingBox가 제대로 적용되어 있는지 검증결과
  ![소파](/dataProcessing/resultImg/rect.png)
  ![서랍장](/dataProcessing/resultImg/polygon.png)

 
 
