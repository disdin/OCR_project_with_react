# !pip install easyocr
import easyocr
import cv2
from matplotlib import pyplot as plt

filename = 'upload\\image.jpg'
img1 = cv2.imread(filename)

if filename.endswith('.png') or filename.endswith('.jpg'): 
  img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
  equ = cv2.equalizeHist(img1)
  reader = easyocr.Reader(['en'], gpu=False)
  result = reader.readtext(equ)


font = cv2.FONT_HERSHEY_SIMPLEX

img = img1
spacer = 100
output = ""
for detection in result:
  top_left = tuple(detection[0][0])
  bottom_right = tuple(detection[0][2])
  text = detection[1]
  output = output + text + " "
  img = cv2.rectangle(img,top_left,bottom_right,(0,255,0),9)
  # img = cv2.putText(img,text,(20,spacer), font, 0.5,(0,255,0),2,cv2.LINE_AA)
  spacer+=15   
  
# print(output)
def transformStr(str):
    str = ''.join(e for e in str if e.isalnum() or e==" ")
    str = str.upper()
    return str

b = transformStr(output)
print(b)

# make this final output
# plt.figure(figsize=(3, 5))
# plt.imshow(img)
# plt.show()
path = 'run/image.jpg'
cv2.imwrite(path, img)
