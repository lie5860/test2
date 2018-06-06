package com.stylefeng.guns.modular.order.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.stylefeng.guns.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import com.stylefeng.guns.core.util.ToolUtil;

import org.springframework.web.bind.annotation.RequestParam;

import com.stylefeng.guns.modular.system.dao.OederMapper;
import com.stylefeng.guns.modular.system.model.Oeder;
import com.stylefeng.guns.modular.order.service.IOederService;

/**
 * 订单管理控制器
 *
 * @author fengshuonan
 * @Date 2018-06-05 13:51:35
 */
@Controller
@RequestMapping("/oeder")
public class OederController extends BaseController {

	private String PREFIX = "/order/oeder/";

	@Autowired
	private IOederService oederService;

	@Autowired
	private OederMapper oederMapper;

	/**
	 * 跳转到订单管理首页
	 */
	@RequestMapping("")
	public String index() {
		return PREFIX + "oeder.html";
	}

	/**
	 * 跳转到添加订单管理
	 */
	@RequestMapping("/oeder_add")
	public String oederAdd() {
		return PREFIX + "oeder_add.html";
	}

	/**
	 * 跳转到修改订单管理
	 */
	@RequestMapping("/oeder_update/{oederId}")
	public String oederUpdate(@PathVariable Integer oederId, Model model) {
		Oeder oeder = oederService.selectById(oederId);
		model.addAttribute("item", oeder);
		LogObjectHolder.me().set(oeder);
		return PREFIX + "oeder_edit.html";
	}

	/**
	 * 获取订单管理列表
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public Object list(String condition) {
		if (ToolUtil.isNotEmpty(condition)) {
			EntityWrapper<Oeder> entityWrapper = new EntityWrapper<Oeder>();
			Wrapper<Oeder> like = entityWrapper.like("user","%"+condition+"%");
			List<Oeder> oeder = oederService.selectList(like);
			return oeder;

		} else {
			List<Oeder> oeder = oederService.selectList(null);
			return oeder;
		}
	}

	/**
	 * 新增订单管理
	 */
	@RequestMapping(value = "/add")
	@ResponseBody
	public Object add(Oeder oeder) {
		oederService.insert(oeder);
		return SUCCESS_TIP;
	}

	/**
	 * 删除订单管理
	 */
	@RequestMapping(value = "/delete")
	@ResponseBody
	public Object delete(@RequestParam Integer oederId) {
		oederService.deleteById(oederId);
		return SUCCESS_TIP;
	}

	/**
	 * 修改订单管理
	 */
	@RequestMapping(value = "/update")
	@ResponseBody
	public Object update(Oeder oeder) {
		oederService.updateById(oeder);
		return SUCCESS_TIP;
	}

	/**
	 * 订单管理详情
	 */
	@RequestMapping(value = "/detail/{oederId}")
	@ResponseBody
	public Object detail(@PathVariable("oederId") Integer oederId) {
		return oederService.selectById(oederId);
	}
}
