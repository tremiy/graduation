#-*- codeing = utf-8 -*-
#@Time : 2022/4/21 23:06
#@Author : tremiy
#@File : test.py
#@software : PyCharm

import codecs

hex_chinese = 'e69da8e6958fe9939d'
# 将十六进制的字符串数据进行解码
result_str = codecs.decode(hex_chinese.encode('utf-8'), "hex").decode('utf-8')
print(f'2.十六进制的字符串经过解码最终的结果为：{result_str}')

chinese = '杨敏铝'
# 字符串生成十六进制
hex_chinese = chinese.encode('utf-8')
print(f'==>中文转成十六进制的结果为：{hex_chinese}')
hex_chinese = hex_chinese.hex()
print(f'==>中文转成十六进制的结果为：{hex_chinese}')