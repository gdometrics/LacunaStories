<?php

$plugin = array(
  'name' => 'categories',
  'label' => t('Categories'),
  'module' => 'annotator',
  'handler' => array(
    'class' => 'CategoriesAnnotatorPlugin',
  ),
  // 'weight' => 1,
  'weight' => 2,
);
